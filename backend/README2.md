# Video 1: Kickoff Plan — Meridian Support AI

## Business Problem

Meridian Electronics currently handles common support requests manually by phone and email. Customers ask about product availability, product details, order history, and placing orders.

This creates delay for customers and repetitive workload for the support team.

## MCP Tool Discovery

The MCP server exposes 8 tools:

- list_products
- get_product
- search_products
- get_customer
- verify_customer_pin
- list_orders
- get_order
- create_order

These tools map directly to customer support workflows: authentication, product search, order lookup, and order creation.

## Proposed Product

I am building Meridian Support AI, a customer support chatbot that helps customers:

- authenticate with email and PIN
- search Meridian’s product catalog
- check product details
- view order history
- place new orders

## Architecture

Frontend: Next.js chat UI on Vercel  
Backend: FastAPI on Cloud Run  
Agent: OpenAI Agents SDK using a cost-effective mini model  
Tool layer: MCP server over Streamable HTTP  

## Build Plan

1. Connect backend to the MCP server and list available tools.
2. Build an agent that uses those tools safely.
3. Create a simple chat interface for customer support.
4. Test core workflows: product search, authentication, order history, and order creation.
5. Deploy backend and frontend.
6. Add CI tests and clean documentation.

## Prioritization

Must-have:
- working MCP connection
- chatbot interface
- product lookup
- customer authentication
- order history
- deployed app

Nice-to-have if time allows:
- better UI polish
- screenshots
- Terraform
- advanced auth
- database persistence

## Trade-off

I will not add Clerk or a database initially because the MCP server already provides the business data layer. My priority is a reliable deployed chatbot that proves the support workflow end-to-end.