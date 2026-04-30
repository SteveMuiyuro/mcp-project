FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=8000

WORKDIR /app

RUN pip install --no-cache-dir uv

COPY app ./app

RUN uv pip install --system \
    "fastapi>=0.115.0,<1.0.0" \
    "openai-agents" \
    "pydantic-settings>=2.6.0,<3.0.0" \
    "uvicorn>=0.32.0,<1.0.0"

CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT}"]
