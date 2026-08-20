import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EditableOutput, PageHeader, ThinkingState } from "@/components/thuso/AiOutput";
import { LanguageSelector } from "@/components/thuso/LanguagePill";
import { RESEARCH_OUTPUT, type LanguageCode } from "@/lib/thuso-data";
import { useThuso } from "@/lib/thuso-store";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — Thuso AI" },
      {
        name: "description",
        content:
          "Summarise a topic or article into key points, a plain-terms explainer and practical recommendations you can act on this week.",
      },
      { property: "og:title", content: "AI Research Assistant — Thuso AI" },
      {
        property: "og:description",
        content: "Key points, plain terms and recommendations from any topic or article.",
      },
    ],
  }),
  component: ResearchAssistant,
});

function ResearchAssistant() {
  const { defaultLanguage } = useThuso();
  const [topic, setTopic] = useState("Hybrid work policies in South African companies in 2026");
  const [language, setLanguage] = useState<LanguageCode>(defaultLanguage);
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [plain, setPlain] = useState(RESEARCH_OUTPUT.plainTerms);
  const [sources, setSources] = useState(RESEARCH_OUTPUT.sources.join("\n"));

  const run = () => {
    setState("loading");
    setTimeout(() => {
      setPlain(RESEARCH_OUTPUT.plainTerms);
      setState("done");
    }, 1700);
  };

  return (
    <>
      <PageHeader
        eyebrow="Research assistant"
        title="Get to the point, fast"
        description="Give Thuso a topic or paste an article. You get the key points, a plain-terms explainer, and a handful of things you can actually do about it."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="card-bento space-y-6">
          <div className="space-y-2">
            <label htmlFor="topic" className="label-mono">
              Topic or pasted article
            </label>
            <Textarea
              id="topic"
              rows={10}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Paste an article, or type a topic like 'POPIA rules for staff WhatsApp groups'"
              className="rounded-2xl border-none bg-surface/60 p-4 text-sm leading-relaxed"
            />
          </div>
          <LanguageSelector value={language} onChange={setLanguage} label="Answer in" />
          <Button size="lg" className="w-full rounded-full" onClick={run}>
            Research this
          </Button>
        </section>

        <div className="space-y-5">
          {state === "idle" && (
            <div className="card-bento flex min-h-56 flex-col justify-center text-center">
              <p className="font-display text-lg font-semibold">
                What are you trying to understand?
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Start with the sample topic to see the shape of a Thuso research note.
              </p>
            </div>
          )}
          {state === "loading" && (
            <ThinkingState
              messages={["Pulling the topic apart…", "Keeping only what's useful to you."]}
            />
          )}
          {state === "done" && (
            <>
              <section className="card-bento animate-rise">
                <h2 className="font-display text-lg font-bold">Key points</h2>
                <ul className="mt-4 space-y-2.5 text-sm leading-relaxed">
                  {RESEARCH_OUTPUT.keyPoints.map((k) => (
                    <li key={k} className="rounded-xl bg-surface/70 p-3">
                      {k}
                    </li>
                  ))}
                </ul>
              </section>

              <EditableOutput
                value={plain}
                onChange={setPlain}
                onRegenerate={run}
                rows={6}
                label="In plain terms — edit freely"
              />

              <section className="card-bento animate-rise">
                <h2 className="font-display text-lg font-bold">What you can do</h2>
                <ol className="mt-4 list-decimal space-y-2.5 pl-5 text-sm leading-relaxed">
                  {RESEARCH_OUTPUT.recommendations.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ol>
              </section>

              <EditableOutput
                value={sources}
                onChange={setSources}
                rows={4}
                label="Source notes — add your own links"
              />

              <p className="rounded-2xl bg-surface px-5 py-4 text-xs leading-relaxed text-foreground/70">
                This is an AI-generated summary built from sample material. Check the facts and
                sources yourself before you use it in a report or a decision.
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
