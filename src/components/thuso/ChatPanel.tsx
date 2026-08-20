import { useCallback, useState } from "react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { CHAT_FALLBACK, CHAT_SCRIPT, CHAT_STARTERS } from "@/lib/thuso-data";
import logo from "@/assets/thuso-logo.png";

type ChatMessage = { id: string; role: "user" | "assistant"; text: string };

const GREETING: ChatMessage = {
  id: "greet",
  role: "assistant",
  text: "Dumela! I'm Thuso — your workplace helper. Ask me to draft something, translate a notice, prep you for a meeting, or work out what to do first today.",
};

function replyFor(input: string) {
  const lower = input.toLowerCase();
  const hit = CHAT_SCRIPT.find((s) => s.keywords.some((k) => lower.includes(k)));
  return hit?.reply ?? CHAT_FALLBACK;
}

export function ChatPanel({ compact = false }: { compact?: boolean }) {
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [status, setStatus] = useState<"ready" | "submitted">("ready");
  const [text, setText] = useState("");

  const send = useCallback((value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: "user", text: trimmed }]);
    setText("");
    setStatus("submitted");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: `a-${Date.now()}`, role: "assistant", text: replyFor(trimmed) },
      ]);
      setStatus("ready");
    }, 1100);
  }, []);

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <Conversation className={compact ? "min-h-0 flex-1" : "min-h-0 flex-1"}>
        <ConversationContent className="gap-5">
          {messages.map((m) => (
            <Message key={m.id} from={m.role}>
              {m.role === "assistant" && (
                <img
                  src={logo}
                  alt=""
                  loading="lazy"
                  width={28}
                  height={28}
                  className="mt-1 size-7 shrink-0 rounded-lg"
                />
              )}
              <MessageContent
                className={
                  m.role === "user"
                    ? "rounded-2xl bg-plum px-4 py-2.5 text-plum-foreground"
                    : "bg-transparent px-0 text-foreground"
                }
              >
                <MessageResponse>{m.text}</MessageResponse>
              </MessageContent>
            </Message>
          ))}
          {status === "submitted" && <Shimmer className="text-sm">Thuso is thinking…</Shimmer>}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      {messages.length === 1 && (
        <div className="flex flex-wrap gap-2">
          {CHAT_STARTERS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              className="rounded-full bg-surface px-3.5 py-1.5 text-xs font-medium text-foreground/80 transition hover:-translate-y-0.5 hover:shadow-soft"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <PromptInput
        onSubmit={(_message, event) => {
          event.preventDefault();
          send(text);
        }}
      >
        <PromptInputTextarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask Thuso anything about your work day…"
        />
        <PromptInputFooter className="justify-end">
          <PromptInputSubmit status={status} disabled={!text.trim()} />
        </PromptInputFooter>
      </PromptInput>
    </div>
  );
}
