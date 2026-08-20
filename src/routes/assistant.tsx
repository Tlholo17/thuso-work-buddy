import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/thuso/AiOutput";
import { ChatPanel } from "@/components/thuso/ChatPanel";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "Multilingual Workplace Assistant — Thuso AI" },
      {
        name: "description",
        content:
          "Chat with Thuso for writing help, translations, meeting prep and day-to-day productivity questions in South Africa's official languages.",
      },
      { property: "og:title", content: "Multilingual Workplace Assistant — Thuso AI" },
      {
        property: "og:description",
        content: "Writing help, translation and meeting prep in a warm, plain-language chat.",
      },
    ],
  }),
  component: Assistant,
});

function Assistant() {
  return (
    <>
      <PageHeader
        eyebrow="Assistant"
        title="Ask Thuso"
        description="Writing help, translations, meeting prep or a second opinion on what to do first. Plain answers, no jargon."
      />
      <div className="card-bento flex h-[65vh] min-h-[28rem] flex-col">
        <ChatPanel />
      </div>
    </>
  );
}
