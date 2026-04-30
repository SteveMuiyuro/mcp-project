from typing import Any

from pydantic import BaseModel


class ToolSummary(BaseModel):
    name: str
    description: str
    input_schema: dict[str, Any] | None = None
