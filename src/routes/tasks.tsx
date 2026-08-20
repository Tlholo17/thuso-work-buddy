import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Circle } from "lucide-react";
import { PageHeader } from "@/components/thuso/AiOutput";
import { useThuso, type Priority } from "@/lib/thuso-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — Thuso AI" },
      {
        name: "description",
        content:
          "A priority board that explains why each task matters, plus a suggested daily schedule built around your real deadlines.",
      },
      { property: "og:title", content: "AI Task Planner — Thuso AI" },
      {
        property: "og:description",
        content: "High, medium and low priority tasks with plain-language reasoning.",
      },
    ],
  }),
  component: TaskPlanner,
});

const COLUMNS: { priority: Priority; blurb: string; accent: string }[] = [
  { priority: "High", blurb: "Someone is blocked or a deadline lands today", accent: "bg-primary" },
  { priority: "Medium", blurb: "Important this week, not this hour", accent: "bg-plum" },
  { priority: "Low", blurb: "Good filler work between meetings", accent: "bg-accent" },
];

const SCHEDULE = [
  { time: "08:30", item: "Clear the two same-day approvals — invoice first" },
  { time: "09:30", item: "Deep work block: Polokwane confirmation and installer call" },
  { time: "11:30", item: "Collect Sandton RSVPs and send the numbers to Nedbank" },
  { time: "13:00", item: "Lunch, away from the screen" },
  { time: "14:00", item: "Draft the Friday progress note while it's fresh" },
  { time: "15:30", item: "Check translations flagged as developing support" },
  { time: "16:30", item: "Ten-minute wrap-up: what moved, what carries to tomorrow" },
];

function TaskPlanner() {
  const { tasks, toggleTask } = useThuso();

  return (
    <>
      <PageHeader
        eyebrow="Task planner"
        title="What to do, and why it's first"
        description="Every task carries a short reason for its place in the queue, so you can trust the order — or move it yourself."
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {COLUMNS.map((col) => {
          const list = tasks.filter((t) => t.priority === col.priority);
          return (
            <section key={col.priority} className="card-bento">
              <div className="flex items-center gap-2.5">
                <span className={cn("size-2.5 rounded-full", col.accent)} />
                <h2 className="font-display text-lg font-bold">{col.priority} priority</h2>
                <span className="ml-auto label-mono">{list.length}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{col.blurb}</p>
              <ul className="mt-4 space-y-3">
                {list.length === 0 && (
                  <li className="rounded-2xl bg-surface/60 p-4 text-sm text-muted-foreground">
                    Nothing here yet — a good sign. Send items over from the Meeting Summarizer when
                    you need to.
                  </li>
                )}
                {list.map((t) => (
                  <li
                    key={t.id}
                    className={cn(
                      "animate-rise rounded-2xl bg-surface/70 p-4 transition",
                      t.done && "opacity-55",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        aria-label={t.done ? "Mark as not done" : "Mark as done"}
                        onClick={() => toggleTask(t.id)}
                        className="mt-0.5 text-muted-foreground transition hover:text-accent"
                      >
                        {t.done ? (
                          <CheckCircle2 className="size-5 text-accent" />
                        ) : (
                          <Circle className="size-5" />
                        )}
                      </button>
                      <div>
                        <p className={cn("font-medium leading-snug", t.done && "line-through")}>
                          {t.title}
                        </p>
                        <p className="font-mono text-[11px] text-foreground/55">
                          {t.owner} · {t.due}
                          {t.fromMeeting ? " · from meeting" : ""}
                        </p>
                        <p className="mt-1.5 text-sm text-muted-foreground">
                          Why this order: {t.reason}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <section className="card-bento mt-5">
        <h2 className="font-display text-xl font-bold">Suggested schedule for today</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          A starting shape for the day. Move anything that clashes with your meetings.
        </p>
        <ul className="mt-5 space-y-3">
          {SCHEDULE.map((s) => (
            <li key={s.time} className="flex gap-4 rounded-xl bg-surface/60 px-4 py-3">
              <span className="font-mono text-xs text-plum">{s.time}</span>
              <span className="text-sm">{s.item}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
