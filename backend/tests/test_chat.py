import pytest
from httpx import ASGITransport, AsyncClient

from app.main import app
from app.routers import chat as chat_router


@pytest.mark.anyio
async def test_chat_returns_a_response(monkeypatch: pytest.MonkeyPatch) -> None:
    async def mock_generate_support_response(message: str) -> str:
        return f"Agent response: {message}"

    monkeypatch.setattr(chat_router, "generate_support_response", mock_generate_support_response)

    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.post("/api/chat", json={"message": "Hello"})

    assert response.status_code == 200
    assert response.json()["response"] == "Agent response: Hello"


@pytest.mark.anyio
async def test_chat_requires_message() -> None:
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.post("/api/chat", json={})

    assert response.status_code == 422
