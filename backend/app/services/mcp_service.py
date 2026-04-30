from agents.exceptions import UserError
from agents.mcp import MCPServerStreamableHttp
from fastapi import HTTPException, status

from app.core.config import get_settings
from app.schemas.tools import ToolSummary


async def discover_tools() -> list[ToolSummary]:
    settings = get_settings()
    if not settings.mcp_server_url:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="MCP_SERVER_URL is not configured.",
        )

    try:
        async with MCPServerStreamableHttp(params={"url": settings.mcp_server_url}) as server:
            tools = await server.list_tools()
    except UserError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Failed to discover MCP tools: {exc.message}",
        ) from exc

    return [
        ToolSummary(
            name=tool.name,
            description=tool.description or "",
            input_schema=tool.inputSchema,
        )
        for tool in tools
    ]
