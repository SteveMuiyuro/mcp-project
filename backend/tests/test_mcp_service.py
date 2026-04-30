import pytest
from fastapi import HTTPException

from app.services import mcp_service


@pytest.mark.anyio
async def test_discover_tools_requires_mcp_server_url(monkeypatch: pytest.MonkeyPatch) -> None:
    class Settings:
        mcp_server_url = ""

    monkeypatch.setattr(mcp_service, "get_settings", lambda: Settings())

    try:
        await mcp_service.discover_tools()
    except HTTPException as exc:
        assert exc.status_code == 503
        assert exc.detail == "MCP_SERVER_URL is not configured."
    else:
        raise AssertionError("discover_tools() should fail when MCP_SERVER_URL is missing")
