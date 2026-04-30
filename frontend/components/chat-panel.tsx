"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type ChatPanelProps = {
  onSubmit: (message: string) => Promise<void>;
  response: string | null;
  loading: boolean;
  error: string | null;
};

export function ChatPanel({ onSubmit, response, loading, error }: ChatPanelProps) {
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = message.trim();
    if (!trimmed) {
      return;
    }

    await onSubmit(trimmed);
    setMessage("");
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Chat / Task Panel</CardTitle>
        <CardDescription>
          Sends a placeholder request to the backend agent endpoint.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Describe the task you want the agent to handle later."
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </Button>
        </form>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <div className="rounded-md border border-dashed border-border bg-muted/40 p-4">
          <p className="mb-2 text-sm font-medium">Response</p>
          <p className="text-sm text-muted-foreground">
            {response ?? "No response yet. Submit a message to test the placeholder flow."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
