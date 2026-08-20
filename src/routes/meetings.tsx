import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowRightCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EditableOutput, PageHeader, ThinkingState } from "@/components/thuso/AiOutput";
import { LanguageSelector } from "@/components/thuso/LanguagePill";
import {
  MEETING_SUMMARY,
  SAMPLE_MEETING_NOTES,
  type LanguageCode,
} from "@/lib/thuso-data";
import { useThuso } from "@/lib/thuso-store";

export const Route = createFileRoute("/meetings")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — Thuso AI" },
      {
        name: "description",
        content:
          "Turn messy meeting notes into a summary, decisions, action items, deadlines and follow-ups you can send straight to your task planner.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer — Thuso AI" },
      {
        property: "og:description",
        content: "Decisions, owners and deadlines pulled out of your notes in seconds.",
      },
    ],
  }),
  component: MeetingSummarizer,
});

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card-bento animate-rise">
      <h2 className="font-display text-lg font-bold">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function MeetingSummarizer() {
  const { defaultLanguage, addTask, tasks } = useThuso();
  const [notes, setNotes] = useState(SAMPLE_MEETING_NOTES);
  const [inputLang, setInputLang] = useState<LanguageCode>(defaultLanguage);
  const [outputLang, setOutputLang] = useState<LanguageCode>(defaultLanguage);
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [summary, setSummary] = useState(MEETING_SUMMARY.summary);

  const run = () => {
    setState("loading");
    setTimeout(() => {
      setSummary(MEETING_SUMMARY.summary);
      setState("done");
    }, 1600);
  };

  return (
    <>
      <PageHeader
        eyebrow="Meeting summarizer"
        title="Turn the notes into next steps"
        description="Paste what was said. Thuso pulls out the summary, the decisions, who owns what, and the dates that matter — then hands the actions to your planner."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="card-bento space-y-6">
          <div className="space-y-2">
            <label htmlFor="notes" className="label-mono">
              Meeting notes
            </label>
            <Textarea
              id="notes"
              rows={14}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="rounded-2xl border-none bg-surface/60 p-4 text-sm leading-relaxed"
            />
          </div>
          <LanguageSelector
            value={inputLang}
            onChange={setInputLang}
            label="Notes are in"
          />
          <LanguageSelector
            value={outputLang}
            onChange={setOutputLang}
            label="Summarise into"
          />
          <Button size="lg" className="w-full rounded-full" onClick={run}>
            Summarise the meeting
          </Button>
        </section>

        <div className="space-y-5">
          {state === "idle" && (
            <div className="card-bento flex min-h-56 flex-col justify-center text-center">
              <p className="font-display text-lg font-semibold">
                Ready when your notes are
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                We've pre-filled a real-looking sample so you can see exactly what comes
                back.
              </p>
            </div>
          )}
          {state === "loading" && (
            <ThinkingState
              messages={[
                "Reading the meeting…",
                "Finding decisions, owners and dates.",
              ]}
            />
          )}
          {state === "done" && (
            <>
              <EditableOutput
                value={summary}
                onChange={setSummary}
                onRegenerate={run}
                rows={8}
                label="Summary — edit freely"
              />

              <Block title="Key decisions">
                <ul className="space-y-2.5 text-sm leading-relaxed">
                  {MEETING_SUMMARY.decisions.map((d) => (
                    <li key={d} className="rounded-xl bg-surface/70 p-3">
                      {d}
                    </li>
                  ))}
                </ul>
              </Block>

              <Block title="Action items">
                <ul className="space-y-3">
                  {MEETING_SUMMARY.actionItems.map((a) => {
                    const added = tasks.some((t) => t.id === a.id);
                    return (
                      <li key={a.id} className="rounded-2xl bg-surface/70 p-4">
                        <p className="font-medium">{a.title}</p>
                        <p className="font-mono text-[11px] text-foreground/55">
                          {a.owner} · {a.due} · {a.priority} priority
                        </p>
                        <p className="mt-1.5 text-sm text-muted-foreground">{a.reason}</p>
                        <Button
                          size="sm"
                          variant={added ? "secondary" : "default"}
                          className="mt-3 rounded-full"
                          disabled={added}
                          onClick={() => {
                            addTask({
                              id: a.id,
                              title: a.title,
                              owner: a.owner,
                              due: a.due,
                              priority: a.priority,
                              reason: a.reason,
                              fromMeeting: true,
                            });
                            toast.success("Added to your task planner");
                          }}
                        >
                          <ArrowRightCircle className="mr-1.5 size-4" />
                          {added ? "In your planner" : "Send to Task Planner"}
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              </Block>

              <Block title="Deadlines">
                <ul className="space-y-2 font-mono text-xs text-foreground/70">
                  {MEETING_SUMMARY.deadlines.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </Block>

              <Block title="Responsible people">
                <ul className="space-y-2 text-sm">
                  {MEETING_SUMMARY.people.map((p) => (
                    <li key={p.name}>
                      <span className="font-medium">{p.name}</span>{" "}
                      <span className="text-muted-foreground">— {p.role}</span>
                    </li>
                  ))}
                </ul>
              </Block>

              <Block title="Follow-ups">
                <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  {MEETING_SUMMARY.followUps.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </Block>
            </>
          )}
        </div>
      </div>
    </>
  );
}
