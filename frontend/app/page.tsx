"use client";

import { useEffect, useState } from "react";

import { ChatPanel } from "@/components/chat-panel";
import { StatusCard } from "@/components/status-card";
import { ToolList } from "@/components/tool-list";
import { getHealth, getTools, postChat, type Tool } from "@/lib/api";

export default function HomePage() {
  const [status, setStatus] = useState<string | null>(null);
  const [statusLoading, setStatusLoading] = useState(true);
  const [statusError, setStatusError] = useState<string | null>(null);

  const [tools, setTools] = useState<Tool[]>([]);
  const [toolsLoading, setToolsLoading] = useState(true);
  const [toolsError, setToolsError] = useState<string | null>(null);

  const [chatResponse, setChatResponse] = useState<string | null>(null);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  useEffect(() => {
    async function loadHealth() {
      try {
        const data = await getHealth();
        setStatus(data.status);
      } catch (error) {
        setStatusError(error instanceof Error ? error.message : "Failed to load backend status.");
      } finally {
        setStatusLoading(false);
      }
    }

    async function loadTools() {
      try {
        const data = await getTools();
        setTools(data);
      } catch (error) {
        setToolsError(error instanceof Error ? error.message : "Failed to load tools.");
      } finally {
        setToolsLoading(false);
      }
    }

    void loadHealth();
    void loadTools();
  }, []);

  async function handleChatSubmit(message: string) {
    setChatLoading(true);
    setChatError(null);

    try {
      const data = await postChat(message);
      setChatResponse(data.response);
    } catch (error) {
      setChatError(error instanceof Error ? error.message : "Failed to send chat message.");
    } finally {
      setChatLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-10">
      <header className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          MCP Assessment Template
        </p>
        <div className="max-w-3xl space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Minimal full-stack scaffold for an MCP-based AI product.
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg">
            The backend and frontend are wired for placeholder health, tool discovery, and chat
            flows so the real MCP server URL and agent logic can be added during the assessment.
          </p>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <StatusCard status={status} loading={statusLoading} error={statusError} />
          <ToolList tools={tools} loading={toolsLoading} error={toolsError} />
        </div>
        <ChatPanel
          onSubmit={handleChatSubmit}
          response={chatResponse}
          loading={chatLoading}
          error={chatError}
        />
      </section>
    </main>
  );
}

