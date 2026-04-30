Improve the frontend UI for Meridian Support AI.

Reviewer warning:
The reviewer is sensitive to AI slop. Keep the UI modern, clean, explainable, and production-lean. Do not add fake dashboards, unused components, unnecessary animations, or over-engineered state management.

Context:
This is a customer support chatbot for Meridian Electronics.
The backend already has:
- GET /health
- GET /api/tools
- POST /api/chat

Frontend goal:
Make the app feel like a polished modern AI customer support platform, not a technical MCP tool viewer.

Important UI changes:
1. Remove the visible MCP tools card/list from the main UI.
2. Keep tool discovery internal. Users should see a customer support chatbot, not raw tool names.
3. Brand the app as:
   Meridian Support AI
4. Subtitle:
   Product lookup, order history, and ordering support powered by Meridian’s internal tools.
5. Use a modern rose/pink theme inspired by these OKLCH colors:
   - oklch(71.2% 0.194 13.428)
   - oklch(64.5% 0.246 16.439)
   - oklch(51.4% 0.222 16.935)
   - oklch(45.5% 0.188 13.697)
   - oklch(41% 0.159 10.272)
   - oklch(27.1% 0.105 12.094)

Design direction:
- Premium support assistant feel
- Clean card layout
- Soft rose gradient background
- Rounded cards
- Clear message bubbles
- Good spacing
- Professional, not playful
- Mobile responsive

Chat UX improvements:
1. Make assistant responses readable.
2. Preserve line breaks.
3. Remove Markdown asterisks like **bold** from displayed responses if not using a markdown renderer.
4. Either:
   - Add react-markdown and render Markdown properly,
   OR
   - Sanitize the response text by removing markdown syntax like ** before displaying.
5. Do not show raw JSON.
6. Show user and assistant messages as separate chat bubbles.
7. Add a loading state that feels like “Meridian Support AI is checking internal systems...”
8. Add suggested prompt chips:
   - Get product details for SKU MON-0054.
   - Search for computers and summarize available options.
   - My email is donaldgarcia@example.net and my PIN is 7912. Verify me and show my order history.

Streaming requirement:
Currently the backend POST /api/chat returns a complete response. If possible within the existing architecture, add frontend simulated streaming by progressively revealing the returned assistant response word-by-word after the API call completes.

Do NOT implement backend SSE unless it can be done cleanly and quickly. Simulated frontend streaming is acceptable for the demo.

Implementation requirements:
1. Keep the app as a single-page Next.js App Router page.
2. Use existing shadcn-style UI primitives where appropriate.
3. Update frontend/app/page.tsx and small components only if needed.
4. Keep API client clean in frontend/lib/api.ts.
5. Use NEXT_PUBLIC_API_URL.
6. Run npm run build.
7. Do not add authentication.
8. Do not add a database.
9. Do not add dashboards or fake analytics.
10. Do not expose MCP tool internals in the UI.

After implementation:
- List files changed.
- Explain what was improved.
- State any trade-offs.
- Suggest a conventional commit message.