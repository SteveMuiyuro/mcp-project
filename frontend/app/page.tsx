"use client";

import { useEffect, useState } from "react";

import { ChatPanel, type ChatMessage } from "@/components/chat-panel";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getHealth, postChat } from "@/lib/api";

const SUGGESTED_PROMPTS = [
  "Get product details for SKU MON-0054.",
  "Search for computers and summarize available options.",
  "My email is donaldgarcia@example.net and my PIN is 7912. Verify me and show my order history.",
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Welcome to Meridian Support AI.\n\nI can help with product lookup, order history, and placing new orders using Meridian's internal systems.",
  },
];

function sanitizeAssistantResponse(response: string): string {
  return response
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .trim();
}

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

export default function HomePage() {
  const [status, setStatus] = useState<"loading" | "online" | "offline">("loading");
  const [statusMessage, setStatusMessage] = useState("Checking Meridian support systems...");
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  useEffect(() => {
    async function loadHealth() {
      try {
        const data = await getHealth();
        setStatus(data.status === "ok" ? "online" : "offline");
        setStatusMessage(
          data.status === "ok"
            ? "Internal support systems are connected."
            : "Support systems reported an unexpected status.",
        );
      } catch (error) {
        setStatus("offline");
        setStatusMessage(
          error instanceof Error
            ? error.message
            : "Meridian Support AI could not reach the backend.",
        );
      }
    }

    void loadHealth();
  }, []);

  async function streamAssistantResponse(messageId: string, fullResponse: string): Promise<void> {
    const parts = fullResponse.split(/(\s+)/).filter(Boolean);
    let revealed = "";

    for (const part of parts) {
      revealed += part;
      setMessages((currentMessages) =>
        currentMessages.map((message) =>
          message.id === messageId ? { ...message, content: revealed, streaming: true } : message,
        ),
      );

      if (part.trim()) {
        await delay(28);
      }
    }

    setMessages((currentMessages) =>
      currentMessages.map((message) =>
        message.id === messageId ? { ...message, content: revealed, streaming: false } : message,
      ),
    );
  }

  async function handleChatSubmit(message: string) {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: message,
    };
    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: "",
      pending: true,
    };

    setMessages((currentMessages) => [...currentMessages, userMessage, assistantMessage]);
    setChatLoading(true);
    setChatError(null);

    try {
      const data = await postChat(message);
      const sanitizedResponse = sanitizeAssistantResponse(data.response);

      setMessages((currentMessages) =>
        currentMessages.map((currentMessage) =>
          currentMessage.id === assistantMessage.id
            ? {
                ...currentMessage,
                content: "",
                pending: false,
              }
            : currentMessage,
        ),
      );

      await streamAssistantResponse(assistantMessage.id, sanitizedResponse);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Meridian Support AI could not complete that request.";

      setChatError(errorMessage);
      setMessages((currentMessages) =>
        currentMessages.map((currentMessage) =>
          currentMessage.id === assistantMessage.id
            ? {
                ...currentMessage,
                content:
                  "I couldn't complete that request because Meridian's internal support systems were unavailable.",
                pending: false,
                streaming: false,
              }
            : currentMessage,
        ),
      );
    } finally {
      setChatLoading(false);
    }
  }

  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(232,121,155,0.18),_transparent_30%),radial-gradient(circle_at_80%_20%,_rgba(244,63,94,0.16),_transparent_24%),linear-gradient(180deg,_rgba(255,247,250,0.96),_rgba(255,255,255,1))]" />
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10 lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <section className="space-y-6">
          <div className="space-y-5">
            <Badge
              className={
                status === "online"
                  ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                  : status === "offline"
                    ? "border border-rose-200 bg-rose-50 text-rose-700"
                    : "border border-rose-200/70 bg-white/70 text-rose-700"
              }
            >
              {status === "online"
                ? "Support Systems Online"
                : status === "offline"
                  ? "Connection Issue"
                  : "Checking Systems"}
            </Badge>
            <div className="max-w-xl space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-rose-700/80">
                Meridian Electronics
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Meridian Support AI
              </h1>
              <p className="text-base leading-7 text-muted-foreground sm:text-lg">
                Product lookup, order history, and ordering support powered by Meridian&apos;s
                internal tools.
              </p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Support Coverage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div className="rounded-2xl border border-rose-100 bg-white/70 p-4">
                Find product details, compare available options, and answer catalog questions
                without exposing internal tool names.
              </div>
              <div className="rounded-2xl border border-rose-100 bg-white/70 p-4">
                Verify customers before reviewing order history or helping them place a new order.
              </div>
              <div className="rounded-2xl border border-rose-100 bg-white/70 p-4">
                Keep responses concise, readable, and focused on customer support outcomes.
              </div>
              <p className="text-xs text-muted-foreground/80">{statusMessage}</p>
            </CardContent>
          </Card>
        </section>

        <ChatPanel
          messages={messages}
          loading={chatLoading}
          error={chatError}
          onSubmit={handleChatSubmit}
          suggestedPrompts={SUGGESTED_PROMPTS}
        />
      </div>
    </main>
  );
}
