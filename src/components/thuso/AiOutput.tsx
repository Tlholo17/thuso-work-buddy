import { Check, Copy, RefreshCw } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { cn } from "@/lib/utils";

export function ThinkingState({ messages }: { messages: string[] }) {
  return (
    <div className="card-bento animate-rise space-y-4">
      <Shimmer className="font-display text-lg font-semibold">
        {messages[0] ?? "Working on it…"}
      </Shimmer>
      <div className="space-y-2.5">
        {[100, 92, 78, 60].map((w) => (
          <div
            key={w}
            className="h-3 animate-pulse rounded-full bg-surface"
            style={{ width: `${w}%` }}
          />
        ))}
      </div>
      <p className="text-sm text-muted-foreground">{messages[1] ?? "A moment please."}</p>
    </div>
  );
}

export function ErrorState({
  title,
  what,
  next,
  onRetry,
}: {
  title: string;
  what: string;
  next: string;
  onRetry: () => void;
}) {
  return (
    <div className="card-bento animate-rise border-l-4 border-destructive/60">
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-foreground/80">{what}</p>
      <p className="mt-1 text-sm text-muted-foreground">{next}</p>
      <Button variant="outline" className="mt-4" onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
}

export function EditableOutput({
  value,
  onChange,
  onRegenerate,
  rows = 16,
  extraActions,
  label = "AI draft — edit anything you like",
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  onRegenerate?: () => void;
  rows?: number;
  extraActions?: ReactNode;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      /* clipboard unavailable — the text stays selectable */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className={cn("card-bento animate-rise space-y-4", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="label-mono">{label}</span>
        <div className="flex flex-wrap gap-2">
          {extraActions}
          {onRegenerate && (
            <Button variant="outline" size="sm" onClick={onRegenerate}>
              <RefreshCw className="mr-1.5 size-3.5" /> Regenerate
            </Button>
          )}
          <Button variant="secondary" size="sm" onClick={copy}>
            {copied ? (
              <Check className="mr-1.5 size-3.5" />
            ) : (
              <Copy className="mr-1.5 size-3.5" />
            )}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      </div>
      <Textarea
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="resize-y rounded-2xl border-none bg-surface/60 p-4 text-[15px] leading-relaxed focus-visible:ring-primary"
      />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="mb-8">
      <p className="label-mono">{eyebrow}</p>
      <h1 className="mt-1.5 font-display text-3xl font-bold sm:text-4xl">{title}</h1>
      <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
        {description}
      </p>
    </header>
  );
}
