Implement the OpenAI Agents SDK chat integration for Meridian Support AI.

Reviewer warning:
The reviewer is sensitive to AI slop. Keep the implementation minimal, clean, explainable, and production-lean. Do not add unused abstractions, fake enterprise features, vague comments, dead files, or hardcoded tool assumptions.

Context:
This is a customer support chatbot for Meridian Electronics.
The MCP server exposes tools for products, customers, authentication, orders, and order creation.

Available MCP tools:
- list_products(category?: string, is_active?: boolean)
- get_product(sku: string)
- search_products(query: string)
- get_customer(customer_id: string)
- verify_customer_pin(email: string, pin: string)
- list_orders(customer_id?: string, status?: string)
- get_order(order_id: string)
- create_order(customer_id: string, items: object[])

Task:
1. Update backend/app/services/agent_service.py to create an OpenAI Agent connected to the MCP server over Streamable HTTP.
2. Use a cost-effective model such as gpt-4o-mini.
3. The agent should behave as a Meridian Electronics customer support chatbot.
4. The agent should use MCP tools when needed and not invent product, customer, or order data.
5. The agent should ask for email and PIN before accessing customer-specific order history.
6. The agent should be able to help with product search, product lookup, order history, and order creation.
7. Update POST /api/chat to call the real agent service.
8. Handle missing OPENAI_API_KEY or MCP_SERVER_URL with clear errors.
9. Keep tests mocked. Do not call real OpenAI or real MCP in unit tests.
10. Run ruff and pytest.

After implementation:
- List changed files.
- State risks/assumptions.
- Suggest a conventional commit message.