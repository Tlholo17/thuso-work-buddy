import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EditableOutput, PageHeader, ThinkingState, ErrorState } from "@/components/thuso/AiOutput";
import { LanguageSelector } from "@/components/thuso/LanguagePill";
import { EMAIL_SAMPLES, TONES, type Tone, type LanguageCode } from "@/lib/thuso-data";
import { useThuso } from "@/lib/thuso-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — Thuso AI" },
      {
        name: "description",
        content:
          "Write workplace emails in four tones and eleven South African languages, then edit, copy or save the draft as a template.",
      },
      { property: "og:title", content: "Smart Email Generator — Thuso AI" },
      {
        property: "og:description",
        content: "Draft professional, formal, friendly or persuasive emails in seconds.",
      },
    ],
  }),
  component: EmailGenerator,
});

function EmailGenerator() {
  const { defaultLanguage, saveTemplate } = useThuso();
  const [purpose, setPurpose] = useState(
    "Tell Naledi in procurement that the Polokwane delay is sorted, share the new dates, and ask her to confirm by Thursday.",
  );
  const [tone, setTone] = useState<Tone>("Professional");
  const [language, setLanguage] = useState<LanguageCode>(defaultLanguage);
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [variant, setVariant] = useState(0);
  const [draft, setDraft] = useState("");

  const generate = (nextVariant = 0, nextTone: Tone = tone) => {
    if (!purpose.trim()) {
      setState("error");
      return;
    }
    setState("loading");
    setTimeout(() => {
      const options = EMAIL_SAMPLES[nextTone];
      setDraft(options[nextVariant % options.length] ?? "");
      setState("done");
    }, 1500);
  };

  return (
    <>
      <PageHeader
        eyebrow="Email generator"
        title="Write the email, keep the warmth"
        description="Tell Thuso what the email needs to do. Pick a tone and a language, and you get a draft you can edit before anyone else sees it."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="card-bento space-y-6">
          <div className="space-y-2">
            <label htmlFor="purpose" className="label-mono">
              What should this email do?
            </label>
            <Textarea
              id="purpose"
              rows={5}
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="e.g. Ask the supplier for a revised delivery date and keep the relationship friendly"
              className="rounded-2xl border-none bg-surface/60 p-4 text-[15px]"
            />
          </div>

          <div className="space-y-2.5">
            <span className="label-mono">Tone</span>
            <div className="flex flex-wrap gap-2">
              {TONES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    setTone(t);
                    setVariant(0);
                    if (state === "done") generate(0, t);
                  }}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition",
                    tone === t
                      ? "bg-plum text-plum-foreground shadow-soft"
                      : "bg-surface text-foreground/80 hover:-translate-y-0.5",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <LanguageSelector value={language} onChange={setLanguage} />

          <Button size="lg" className="w-full rounded-full" onClick={() => generate(variant)}>
            Generate email
          </Button>
        </section>

        <section className="space-y-5">
          {state === "idle" && (
            <div className="card-bento flex h-full min-h-56 flex-col justify-center text-center">
              <p className="font-display text-lg font-semibold">Your draft lands here</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Say what the email needs to do and Thuso will write the first version for you.
              </p>
            </div>
          )}
          {state === "loading" && (
            <ThinkingState
              messages={[
                "Writing your email…",
                "Matching the tone you chose and keeping it short.",
              ]}
            />
          )}
          {state === "error" && (
            <ErrorState
              title="Thuso needs a bit more to work with"
              what="The purpose box was empty, so there was nothing to write about."
              next="Add a sentence about who the email is for and what you want to happen, then generate again."
              onRetry={() => setState("idle")}
            />
          )}
          {state === "done" && (
            <EditableOutput
              value={draft}
              onChange={setDraft}
              onRegenerate={() => {
                const next = variant + 1;
                setVariant(next);
                generate(next);
              }}
              extraActions={
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    saveTemplate({ title: `${tone} email`, body: draft });
                    toast.success("Saved as a template you can reuse");
                  }}
                >
                  Save as template
                </Button>
              }
            />
          )}
        </section>
      </div>
    </>
  );
}
