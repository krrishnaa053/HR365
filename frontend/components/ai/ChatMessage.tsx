"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import FeedbackButtons from "@/components/assistant/FeedbackButtons";
import type { ChatMessage as ChatMessageType } from "@/types/assistant";

interface Props {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: Props) {
  const isUser = message.role === "user";
  const response = message.response;

  return (
    <div className={isUser ? "flex justify-end" : "flex justify-start"}>
      <div
        className={
          isUser
            ? "max-w-[80%] rounded-2xl rounded-tr-sm bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3.5 text-sm leading-relaxed text-white shadow-lg"
            : "w-full max-w-4xl rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7 shadow-xl backdrop-blur-2xl"
        }
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="hr365-markdown text-[15px] leading-7 text-[var(--foreground)]">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="mb-5 mt-2 text-2xl font-semibold tracking-[-0.03em]">
                    {children}
                  </h1>
                ),

                h2: ({ children }) => (
                  <h2 className="mb-4 mt-7 text-xl font-semibold tracking-[-0.025em]">
                    {children}
                  </h2>
                ),

                h3: ({ children }) => (
                  <h3 className="mb-3 mt-6 text-base font-semibold">
                    {children}
                  </h3>
                ),

                p: ({ children }) => (
                  <p className="mb-4 last:mb-0">{children}</p>
                ),

                ul: ({ children }) => (
                  <ul className="mb-5 ml-5 list-disc space-y-2">
                    {children}
                  </ul>
                ),

                ol: ({ children }) => (
                  <ol className="mb-5 ml-5 list-decimal space-y-2">
                    {children}
                  </ol>
                ),

                li: ({ children }) => (
                  <li className="pl-1">{children}</li>
                ),

                strong: ({ children }) => (
                  <strong className="font-semibold text-black dark:text-white">
                    {children}
                  </strong>
                ),

                blockquote: ({ children }) => (
                  <blockquote className="my-5 border-l-2 border-black/20 pl-4 text-black/60 dark:border-white/20 dark:text-white/60">
                    {children}
                  </blockquote>
                ),

                code: ({ children, className }) => {
                  const isBlock = Boolean(className);

                  return isBlock ? (
                    <code
                      className={`${className} block overflow-x-auto rounded-xl bg-black/[0.04] p-4 text-[13px] leading-6 dark:bg-white/[0.06]`}
                    >
                      {children}
                    </code>
                  ) : (
                    <code className="rounded-md bg-black/[0.06] px-1.5 py-0.5 font-mono text-[13px] dark:bg-white/[0.08]">
                      {children}
                    </code>
                  );
                },

                pre: ({ children }) => (
                  <pre className="mb-5 overflow-x-auto rounded-xl">
                    {children}
                  </pre>
                ),

                table: ({ children }) => (
                  <div className="my-6 overflow-x-auto rounded-xl border border-black/[0.08] dark:border-white/[0.08]">
                    <table className="w-full min-w-[600px] border-collapse text-sm">
                      {children}
                    </table>
                  </div>
                ),

                thead: ({ children }) => (
                  <thead className="bg-black/[0.035] dark:bg-white/[0.05]">
                    {children}
                  </thead>
                ),

                th: ({ children }) => (
                  <th className="border-b border-black/[0.08] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-black/60 dark:border-white/[0.08] dark:text-white/60">
                    {children}
                  </th>
                ),

                td: ({ children }) => (
                  <td className="border-b border-black/[0.06] px-4 py-3 align-top dark:border-white/[0.06]">
                    {children}
                  </td>
                ),

                hr: () => (
                  <hr className="my-7 border-black/[0.08] dark:border-white/[0.08]" />
                ),

                a: ({ children, href }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-4"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}

        {/* AI metadata */}
        {!isUser && response && (
          <div className="mt-6 space-y-4 border-t border-[var(--border)] pt-5">
            {/* Confidence */}
            {response.confidence && (
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span>Confidence {response.confidence.level}</span>
                <span>·</span>
                <span>{Math.round(response.confidence.score * 100)}%</span>
              </div>
            )}

            {/* Escalation */}
            {response.escalation_required && (
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-4 text-sm">
                <p className="font-semibold text-amber-700 dark:text-amber-300">
                  HR review required
                </p>

                {response.escalation_reason && (
                  <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                    {response.escalation_reason}
                  </p>
                )}

                {response.hr_ticket_id && (
                  <p className="mt-2 text-xs font-medium text-[var(--foreground)]">
                    Ticket: {response.hr_ticket_id}
                  </p>
                )}
              </div>
            )}

            {/* Sources */}
            {response.sources?.length > 0 && (
              <details className="group rounded-2xl border border-[var(--border)] bg-[var(--surface-hover)] p-3.5 transition-all">
                <summary className="flex cursor-pointer select-none items-center justify-between text-xs font-semibold text-[var(--foreground)]">
                  <span className="flex items-center gap-1.5">
                    <span>📄</span>
                    <span>
                      {response.sources.length} source
                      {response.sources.length !== 1 ? "s" : ""} referenced
                    </span>
                  </span>
                  <span className="text-xs text-[var(--muted)] transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>

                <div className="mt-3 space-y-2 border-t border-[var(--border)] pt-3">
                  {response.sources.map((source, index) => (
                    <div
                      key={`${source.source ?? source.filename ?? "source"}-${index}`}
                      className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-xs"
                    >
                      <div className="font-semibold text-[var(--foreground)]">
                        {source.source ?? source.filename ?? "Reference Document"}
                      </div>

                      {typeof source.score === "number" && (
                        <div className="mt-1 text-xs text-[var(--muted)]">
                          Relevance: {Math.round(source.score * 100)}%
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </details>
            )}

            {/* Feedback */}
            <FeedbackButtons
              message={message}
            />
          </div>
        )}
      </div>
    </div>
  );
}