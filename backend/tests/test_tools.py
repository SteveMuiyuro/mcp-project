import pytest
from httpx import ASGITransport, AsyncClient

from app.main import app
from app.routers import tools as tools_router
from app.schemas.tools import ToolSummary


@pytest.mark.anyio
async def test_tools_returns_a_list(monkeypatch: pytest.MonkeyPatch) -> None:
    async def mock_discover_tools() -> list[ToolSummary]:
        return [
            ToolSummary(
                name="lookup_order",
                description="Look up an order by ID",
                input_schema={"type": "object", "properties": {"order_id": {"type": "string"}}},
            )
        ]

    monkeypatch.setattr(tools_router, "discover_tools", mock_discover_tools)

    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/api/tools")

    assert response.status_code == 200
    assert response.json() == [
        {
            "name": "lookup_order",
            "description": "Look up an order by ID",
            "input_schema": {
                "type": "object",
                "properties": {"order_id": {"type": "string"}},
            },
        }
    ]
