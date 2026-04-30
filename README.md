# MCP Product Template

Assessment-ready full-stack template for an MCP-based AI product. This repository provides a clean starting point with a FastAPI backend, a Next.js frontend, backend CI, and placeholder service boundaries for future MCP and OpenAI integration.

## Project Overview

- `backend/` contains the FastAPI API, placeholder MCP and agent services, tests, and a Cloud Run-ready Dockerfile.
- `frontend/` contains a small Next.js App Router UI for health checks, tool discovery, and chat placeholders.
- `.github/workflows/backend-ci.yml` runs backend linting and tests.

The MCP and OpenAI logic are intentionally placeholders in this template. They are not implemented yet and are meant to be wired during the assessment.

## Local Backend Setup

```bash
cd backend
cp .env.example .env
uv sync --dev
uv run uvicorn app.main:app --reload
```

The backend starts on `http://localhost:8000`.

## Local Frontend Setup

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

The frontend starts on `http://localhost:3000`.

## Environment Variables

### Backend

Defined in [`backend/.env.example`](/home/steve/Projects/mcp-project/backend/.env.example):

- `OPENAI_API_KEY=`
- `MCP_SERVER_URL=`
- `CORS_ALLOWED_ORIGINS=http://localhost:3000`

### Frontend

Defined in [`frontend/.env.example`](/home/steve/Projects/mcp-project/frontend/.env.example):

- `NEXT_PUBLIC_API_URL=http://localhost:8000`

## Test Commands

```bash
cd backend
uv run ruff check .
uv run pytest
```

## Cloud Run Note

The backend Dockerfile is prepared for Google Cloud Run and runs:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

It does not include API Gateway, Terraform, or Secret Manager setup yet.

## Deferred Work

- Real MCP server connection and tool discovery
- OpenAI Agents SDK wiring and agent orchestration
- Production auth, persistence, and deployment automation

