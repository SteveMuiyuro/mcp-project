from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings
from app.routers.chat import router as chat_router
from app.routers.health import router as health_router
from app.routers.tools import router as tools_router

settings = get_settings()

app = FastAPI(title="MCP Product Template API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(tools_router)
app.include_router(chat_router)

