

## What I’ve Built So Far

So far I’ve built the backend service and connected it to the MCP server using the OpenAI Agents SDK.

The MCP server exposes tools for product lookup, product search, customer verification, order history, and order creation.

I implemented a FastAPI backend with endpoints for:
- Health checks
- Tool discovery
- Chat interaction via an AI agent

The agent is configured to:
- Use MCP tools as the source of truth
- Avoid generating or hallucinating data
- Guide the user through supported workflows

---

## What Worked Well

Tool discovery worked smoothly. I was able to dynamically fetch all available MCP tools and map them to customer support workflows.

The chatbot is already able to:
- Retrieve product details by SKU (e.g., MON-0054)
- Search for products across categories
- Verify customers using email and PIN
- Fetch customer order history

These flows are working end-to-end through the MCP server.

---

## Handling AI-Generated Code

I used AI tools to accelerate development, but I reviewed and simplified all generated code.

Key improvements:
- Kept the service layer minimal and easy to understand
- Avoided unnecessary abstractions or “enterprise-style” overengineering
- Ensured all tests mock external dependencies (OpenAI and MCP server)
- Added explicit error handling for missing configuration

This ensures the system is clean, explainable, and production-ready.

---

## Challenges / Blockers

I encountered a few configuration-related issues:

- Initially used `.env.example` instead of `.env`, so environment variables were not loaded at runtime
- Encountered a parsing issue with `CORS_ALLOWED_ORIGINS`, which required formatting it as a list instead of a plain string
- Needed to ensure the backend was started from the correct working directory for environment loading

These issues were resolved by:
- Creating a proper `.env` file
- Correcting variable formats
- Restarting the backend from the correct directory

---

## Current Limitations

The chatbot is currently **single-turn**.

This means:
- Authentication context is not persisted across multiple messages
- The user must include email and PIN in the same request for order-related workflows

This is acceptable for a prototype.

In production, I would:
- Implement session-based or token-based authentication
- Persist user context securely

---

## What I’m Working On Next

Next steps:
1. Integrate the frontend chat interface
2. Deploy the backend to Google Cloud Run
3. Deploy the frontend to Vercel
4. Validate full customer support workflows end-to-end

---

## Trade-offs

Given the time constraints, I prioritized:

- A working end-to-end system
- Clean architecture and explainable code
- Reliable MCP integration

I intentionally did **not** add:
- External authentication frameworks (e.g., Clerk)
- A database layer

Because:
- The MCP server already provides the business logic and data layer

If I had more time, I would:
- Add session handling
- Improve UI/UX
- Add observability and logging

---

## Summary

The system is already capable of handling core customer support workflows using real backend tools via MCP.

The focus now is completing deployment and polishing the demo for final presentation.