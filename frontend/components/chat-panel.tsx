"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  pending?: boolean;
  streaming?: boolean;
};

type ChatPanelProps = {
  messages: ChatMessage[];
  onSubmit: (message: string) => Promise<void>;
  suggestedPrompts: string[];
  loading: boolean;
  error: string | null;
};

export function ChatPanel({
  messages,
  onSubmit,
  suggestedPrompts,
  loading,
  error,
}: ChatPanelProps) {
  const [message, setMessage] = useState("");
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = transcriptRef.current;
    if (!element) {
      return;
    }

    element.scrollTo({
      top: element.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  async function submitMessage(nextMessage: string) {
    const trimmed = nextMessage.trim();
    if (!trimmed || loading) {
      return;
    }

    setMessage("");
    await onSubmit(trimmed);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await submitMessage(message);
  }

  return (
    <Card className="flex min-h-[720px] flex-col overflow-hidden">
      <CardHeader className="border-b border-rose-100/80 pb-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <CardTitle>Customer Support Chat</CardTitle>
            <p className="text-sm text-muted-foreground">
              Ask about products, order history, or help placing a new order.
            </p>
          </div>
          <div className="hidden rounded-full border border-rose-100 bg-white/80 px-3 py-1 text-xs font-medium text-rose-700 sm:block">
            Meridian Support AI
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 flex-col gap-5 p-4 sm:p-6">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rose-700/80">
            Suggested Prompts
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => void submitMessage(prompt)}
                disabled={loading}
                className="rounded-full border border-rose-200 bg-white/85 px-3 py-2 text-left text-sm text-foreground transition hover:border-rose-300 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={transcriptRef}
          className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto rounded-[1.5rem] border border-rose-100/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,251,252,0.96))] p-4 sm:p-5"
        >
          {messages.map((entry) => {
            const isAssistant = entry.role === "assistant";

            return (
              <div
                key={entry.id}
                className={cn("flex", isAssistant ? "justify-start" : "justify-end")}
              >
                <div
                  className={cn(
                    "max-w-[88%] rounded-[1.35rem] px-4 py-3 text-sm leading-6 shadow-sm sm:max-w-[78%]",
                    isAssistant
                      ? "border border-rose-100 bg-white text-foreground"
                      : "bg-primary text-primary-foreground",
                  )}
                >
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] opacity-70">
                    {isAssistant ? "Assistant" : "You"}
                  </p>
                  {entry.pending ? (
                    <div className="space-y-2">
                      <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                        Meridian Support AI is checking internal systems...
                      </p>
                      <div className="flex gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-rose-300 animate-pulse" />
                        <span
                          className="h-2 w-2 rounded-full bg-rose-400 animate-pulse"
                          style={{ animationDelay: "120ms" }}
                        />
                        <span
                          className="h-2 w-2 rounded-full bg-rose-500 animate-pulse"
                          style={{ animationDelay: "240ms" }}
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap break-words">
                      {entry.content}
                      {entry.streaming ? (
                        <span className="ml-1 inline-block h-4 w-2 animate-pulse rounded-full bg-rose-300 align-middle" />
                      ) : null}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <Textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Ask about a product, verify a customer, or request help with an order."
            disabled={loading}
            className="min-h-28 resize-none"
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Meridian Support AI can verify customers before accessing order history.
            </p>
            <Button type="submit" disabled={loading || !message.trim()} className="sm:min-w-40">
              {loading ? "Checking..." : "Send Message"}
            </Button>
          </div>
          {error ? <p className="text-sm text-rose-700">{error}</p> : null}
        </form>
      </CardContent>
    </Card>
  );
}
