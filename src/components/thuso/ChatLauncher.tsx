import { MessageCircleHeart, X } from "lucide-react";
import { useState } from "react";
import { ChatPanel } from "./ChatPanel";

export function ChatLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div className="fixed right-4 bottom-24 z-50 flex h-[70vh] w-[min(24rem,calc(100vw-2rem))] animate-rise flex-col rounded-3xl bg-card p-4 shadow-lift lg:bottom-24">
          <div className="mb-2 flex items-center justify-between">
            <p className="font-display text-base font-bold">Ask Thuso</p>
            <button
              type="button"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-surface"
            >
              <X className="size-4" />
            </button>
          </div>
          <div className="min-h-0 flex-1">
            <ChatPanel compact />
          </div>
        </div>
      )}
      <button
        type="button"
        aria-label={open ? "Close Thuso chat" : "Open Thuso chat"}
        onClick={() => setOpen((v) => !v)}
        className="fixed right-4 bottom-20 z-50 flex size-14 animate-soft-pulse items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lift transition hover:-translate-y-0.5 lg:bottom-6"
      >
        {open ? <X className="size-6" /> : <MessageCircleHeart className="size-6" />}
      </button>
    </>
  );
}
