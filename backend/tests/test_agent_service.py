from types import SimpleNamespace

import pytest
from fastapi import HTTPException

from app.services import agent_service


class DummyMCPServer:
    def __init__(self, params: dict[str, str]) -> None:
        self.params = params

    async def __aenter__(self) -> "DummyMCPServer":
        return self

    async def __aexit__(self, exc_type, exc, tb) -> None:
        return None


@pytest.mark.anyio
async def test_generate_support_response_requires_openai_api_key(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setattr(
        agent_service,
        "get_settings",
        lambda: SimpleNamespace(openai_api_key="", mcp_server_url="http://mcp.test"),
    )

    with pytest.raises(HTTPException) as exc_info:
        await agent_service.generate_support_response("hello")

    assert exc_info.value.status_code == 503
    assert exc_info.value.detail == "OPENAI_API_KEY is not configured."


@pytest.mark.anyio
async def test_generate_support_response_requires_mcp_server_url(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setattr(
        agent_service,
        "get_settings",
        lambda: SimpleNamespace(openai_api_key="test-key", mcp_server_url=""),
    )

    with pytest.raises(HTTPException) as exc_info:
        await agent_service.generate_support_response("hello")

    assert exc_info.value.status_code == 503
    assert exc_info.value.detail == "MCP_SERVER_URL is not configured."


@pytest.mark.anyio
async def test_generate_support_response_returns_runner_output(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setattr(
        agent_service,
        "get_settings",
        lambda: SimpleNamespace(
            openai_api_key="test-key",
            mcp_server_url="http://mcp.test",
        ),
    )
    monkeypatch.setattr(agent_service, "_get_openai_client", lambda api_key: object())
    monkeypatch.setattr(agent_service, "set_default_openai_client", lambda client, **kwargs: None)
    monkeypatch.setattr(agent_service, "set_default_openai_api", lambda api: None)
    monkeypatch.setattr(agent_service, "MCPServerStreamableHttp", DummyMCPServer)

    captured: dict[str, object] = {}

    async def mock_run(agent, message: str, max_turns: int):
        captured["agent_name"] = agent.name
        captured["message"] = message
        captured["max_turns"] = max_turns
        return SimpleNamespace(
            final_output_as=lambda cls, raise_if_incorrect_type=False: "Resolved by agent"
        )

    monkeypatch.setattr(agent_service.Runner, "run", mock_run)

    response = await agent_service.generate_support_response("Where is my order?")

    assert response == "Resolved by agent"
    assert captured == {
        "agent_name": "Meridian Support AI",
        "message": "Where is my order?",
        "max_turns": 8,
    }
