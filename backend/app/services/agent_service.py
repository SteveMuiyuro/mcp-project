from functools import lru_cache

from agents import Agent, ModelSettings, Runner, set_default_openai_api, set_default_openai_client
from agents.exceptions import UserError
from agents.mcp import MCPServerStreamableHttp
from fastapi import HTTPException, status
from openai import AsyncOpenAI

from app.core.config import get_settings

MERIDIAN_SUPPORT_INSTRUCTIONS = """
You are Meridian Support AI, a customer support chatbot for Meridian Electronics.

Use the MCP tools as the source of truth for products, customers, authentication, and orders.
Never invent product details, customer records, order history, availability, or order outcomes.

You can help with:
- product search and lookup
- customer order history
- order creation

Rules:
- Use MCP tools whenever live business data is needed.
- Before accessing customer-specific order history or creating an order, ask for the customer's
  email and PIN if they are not already provided in the current request.
- Verify the provided email and PIN with the authentication tool before accessing customer-specific
  order data or creating an order.
- If a required identifier such as customer_id or order_id is missing, ask for it clearly instead
  of guessing.
- Keep responses concise, practical, and support-focused.
""".strip()


def _missing_configuration_error(api_key: str, mcp_server_url: str) -> HTTPException | None:
    missing: list[str] = []

    if not api_key:
        missing.append("OPENAI_API_KEY")
    if not mcp_server_url:
        missing.append("MCP_SERVER_URL")

    if not missing:
        return None

    if len(missing) == 1:
        detail = f"{missing[0]} is not configured."
    else:
        detail = f"{' and '.join(missing)} are not configured."

    return HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=detail)


@lru_cache
def _get_openai_client(api_key: str) -> AsyncOpenAI:
    return AsyncOpenAI(api_key=api_key)


def _build_agent(mcp_server: MCPServerStreamableHttp) -> Agent[None]:
    return Agent(
        name="Meridian Support AI",
        instructions=MERIDIAN_SUPPORT_INSTRUCTIONS,
        model="gpt-4o-mini",
        model_settings=ModelSettings(temperature=0),
        mcp_servers=[mcp_server],
    )


async def generate_support_response(message: str) -> str:
    settings = get_settings()
    configuration_error = _missing_configuration_error(
        settings.openai_api_key,
        settings.mcp_server_url,
    )
    if configuration_error is not None:
        raise configuration_error

    client = _get_openai_client(settings.openai_api_key)
    set_default_openai_client(client, use_for_tracing=False)
    set_default_openai_api("responses")

    try:
        async with MCPServerStreamableHttp(params={"url": settings.mcp_server_url}) as server:
            agent = _build_agent(server)
            result = await Runner.run(agent, message, max_turns=8)
            return result.final_output_as(str, raise_if_incorrect_type=True)
    except UserError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Agent request failed: {exc.message}",
        ) from exc
    except TypeError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Agent returned an unexpected response format.",
        ) from exc
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Agent request failed.",
        ) from exc
