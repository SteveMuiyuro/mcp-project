import pytest
from httpx import ASGITransport, AsyncClient

from app.main import app


@pytest.mark.anyio
async def test_chat_returns_a_response() -> None:
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.post("/api/chat", json={"message": "Hello"})

    assert response.status_code == 200
    assert response.json()["response"] == "Placeholder response: received 'Hello'."


@pytest.mark.anyio
async def test_chat_requires_message() -> None:
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.post("/api/chat", json={})

    assert response.status_code == 422
