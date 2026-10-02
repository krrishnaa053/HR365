"use client";

import { useState } from "react";
import MessageBubble from "./MessageBubble";
import { api } from "@/lib/api";

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}

export default function ChatBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function send() {
    const question = input.trim();

    if (!question || sending) {
      return;
    }

    setError("");
    setSending(true);
    setMessages((previous) => [
      ...previous,
      { role: "user", text: question },
    ]);

    try {
      const response = await api.askHR(question);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text:
            response.answer ||
            response.message ||
            "Here is your HR information",
        },
      ]);
      setInput("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to reach HR365. Check that the backend is running.",
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="card">
      <div className="h-96 space-y-4 overflow-y-auto">
        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            role={message.role}
            text={message.text}
          />
        ))}
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="mt-5 flex gap-3">
        <input
          className="flex-1 rounded-xl border p-3"
          placeholder="Ask HR anything..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              void send();
            }
          }}
        />

        <button
          type="button"
          onClick={() => void send()}
          disabled={sending || !input.trim()}
          className="rounded-xl bg-blue-600 px-6 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {sending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}