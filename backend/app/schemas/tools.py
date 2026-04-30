from pydantic import BaseModel


class ToolSummary(BaseModel):
    name: str
    description: str

