"use client";

import AppShell from "@/components/layout/AppShell";
import ChatWindow from "@/components/ai/ChatWindow";

export default function AssistantPage() {
  return (
    <AppShell>
      <div className="h-[calc(100vh-76px)] md:h-[calc(100vh-156px)] xl:h-[calc(100vh-76px)] w-full overflow-hidden">
        <ChatWindow />
      </div>
    </AppShell>
  );
}