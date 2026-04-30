Update the Next.js frontend for Meridian Support AI.

Reviewer warning:
The reviewer is sensitive to AI slop. Keep the UI clean, modern, minimal, and explainable. Use shadcn-style components already present. Do not add unused components, fake dashboards, or unnecessary animations.

Context:
The backend is working:
- GET /health
- GET /api/tools
- POST /api/chat

The app is a customer support chatbot for Meridian Electronics.

Frontend requirements:
1. Brand the app as "Meridian Support AI".
2. Show a short business-focused subtitle: "AI customer support for product lookup, order history, and ordering."
3. Show backend status.
4. Show MCP tools in a compact card.
5. Provide a chat interface.
6. Add three suggested demo prompts:
   - "Get product details for SKU MON-0054."
   - "Search for computers and summarize available options."
   - "My email is donaldgarcia@example.net and my PIN is 7912. Verify me and show my order history."
7. Display assistant responses clearly, preserving line breaks.
8. Add loading and error states.
9. Keep it as a single-page app.
10. Do not add authentication, database, or session memory.

After implementation:
- Run npm run build.
- List changed files.
- Suggest a conventional commit message.