from fastapi import APIRouter

from app.schemas.tools import ToolSummary
from app.services.mcp_service import discover_tools

router = APIRouter(prefix="/api", tags=["tools"])


@router.get("/tools", response_model=list[ToolSummary])
async def list_tools() -> list[ToolSummary]:
    return await discover_tools()
