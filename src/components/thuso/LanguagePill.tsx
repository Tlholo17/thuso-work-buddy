import { cn } from "@/lib/utils";
import {
  CONFIDENCE_LABEL,
  LANGUAGES,
  getLanguage,
  type LanguageCode,
} from "@/lib/thuso-data";

export function LanguagePill({
  code,
  active = false,
  onClick,
  size = "md",
  className,
}: {
  code: LanguageCode;
  active?: boolean;
  onClick?: () => void;
  size?: "sm" | "md";
  className?: string;
}) {
  const lang = getLanguage(code);
  const Comp = onClick ? "button" : "span";
  return (
    <Comp
      type={onClick ? "button" : undefined}
      onClick={onClick}
      title={`${lang.name} · ${CONFIDENCE_LABEL[lang.confidence]}`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium transition-all",
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3.5 py-1.5 text-sm",
        onClick && "hover:-translate-y-0.5 hover:shadow-soft",
        active
          ? "bg-foreground text-background shadow-soft"
          : "bg-surface text-foreground/80",
        className,
      )}
    >
      <span
        className="size-2.5 shrink-0 rounded-full"
        style={{ backgroundColor: `var(--lang-${code})` }}
      />
      {lang.name}
    </Comp>
  );
}

export function ConfidenceChip({ code }: { code: LanguageCode }) {
  const lang = getLanguage(code);
  const strong = lang.confidence === "strong";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wider",
        strong ? "bg-accent/15 text-accent" : "bg-primary/20 text-foreground/70",
      )}
    >
      <span
        className={cn("size-1.5 rounded-full", strong ? "bg-accent" : "bg-primary")}
      />
      {CONFIDENCE_LABEL[lang.confidence]}
    </span>
  );
}

export function LanguageSelector({
  value,
  onChange,
  label = "Language",
}: {
  value: LanguageCode;
  onChange: (code: LanguageCode) => void;
  label?: string;
}) {
  return (
    <div className="space-y-2.5">
      <div className="flex flex-wrap items-center gap-3">
        <span className="label-mono">{label}</span>
        <ConfidenceChip code={value} />
      </div>
      <div className="flex flex-wrap gap-2">
        {LANGUAGES.map((l) => (
          <LanguagePill
            key={l.code}
            code={l.code}
            active={l.code === value}
            onClick={() => onChange(l.code)}
          />
        ))}
      </div>
    </div>
  );
}
