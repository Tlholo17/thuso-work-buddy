import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Mail, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/thuso/AiOutput";
import { LanguagePill } from "@/components/thuso/LanguagePill";
import { DRAFTED_EMAILS, PENDING_ACTIONS } from "@/lib/thuso-data";
import { useThuso } from "@/lib/thuso-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Daily Brief — Thuso AI workplace assistant" },
      {
        name: "description",
        content:
          "Your day at a glance: pending actions, drafted emails and prioritised tasks, with support for all 11 South African languages.",
      },
      { property: "og:title", content: "Daily Brief — Thuso AI" },
      {
        property: "og:description",
        content:
          "Pending actions, drafted emails and prioritised tasks in one warm, multilingual workplace assistant.",
      },
    ],
  }),
  component: DailyBrief,
});

function DailyBrief() {
  const { tasks, toggleTask } = useThuso();
  const today = tasks.filter((t) => !t.done).slice(0, 5);

  return (
    <>
      <PageHeader
        eyebrow="Thursday, 20 August"
        title="Dumela, here's your day"
        description="Four things need a decision, two drafts are waiting for you, and your top tasks are already sorted by what actually matters today."
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <section className="card-bento lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold">Needs your decision</h2>
            <span className="label-mono">{PENDING_ACTIONS.length} pending</span>
          </div>
          <ul className="mt-5 space-y-3">
            {PENDING_ACTIONS.map((a) => (
              <li
                key={a.id}
                className="rounded-2xl bg-surface/70 p-4 transition hover:-translate-y-0.5 hover:shadow-soft"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="font-medium">{a.title}</p>
                  <span className="rounded-full bg-primary/25 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider">
                    {a.tag}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{a.detail}</p>
                <p className="mt-2 flex items-center gap-1.5 font-mono text-[11px] text-foreground/60">
                  <Clock className="size-3.5" /> {a.due}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="card-bento">
          <h2 className="font-display text-xl font-bold">Today's top tasks</h2>
          <ul className="mt-5 space-y-3">
            {today.map((t) => (
              <li key={t.id} className="flex items-start gap-3">
                <button
                  type="button"
                  aria-label={`Mark ${t.title} done`}
                  onClick={() => toggleTask(t.id)}
                  className="mt-0.5 text-muted-foreground transition hover:text-accent"
                >
                  <CheckCircle2 className="size-5" />
                </button>
                <div>
                  <p className="text-sm font-medium leading-snug">{t.title}</p>
                  <p className="font-mono text-[11px] text-foreground/55">
                    {t.priority} · {t.due}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <Link
            to="/tasks"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-plum hover:underline"
          >
            Open the task planner <ArrowRight className="size-4" />
          </Link>
        </section>

        <section className="card-bento lg:col-span-3">
          <h2 className="font-display text-xl font-bold">Drafts waiting for review</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {DRAFTED_EMAILS.map((d) => (
              <article key={d.id} className="rounded-2xl bg-surface/70 p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Mail className="size-4 text-plum" />
                  <span className="label-mono">{d.tone}</span>
                  <LanguagePill code={d.language} size="sm" />
                </div>
                <p className="mt-3 font-display text-base font-semibold">{d.subject}</p>
                <p className="font-mono text-[11px] text-foreground/55">To {d.to}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {d.preview}
                </p>
                <Link
                  to="/email"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-plum hover:underline"
                >
                  Review and send <ArrowRight className="size-4" />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
