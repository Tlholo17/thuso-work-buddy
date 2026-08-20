import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/thuso/AiOutput";
import { LanguageSelector, LanguagePill } from "@/components/thuso/LanguagePill";
import { LANGUAGES, RESPONSIBLE_AI_NOTICE } from "@/lib/thuso-data";
import { useThuso } from "@/lib/thuso-store";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Thuso AI" },
      {
        name: "description",
        content:
          "Choose your default working language and read the full Thuso AI responsible use notice.",
      },
      { property: "og:title", content: "Settings — Thuso AI" },
      {
        property: "og:description",
        content: "Default language, language support levels and responsible AI guidance.",
      },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { defaultLanguage, setDefaultLanguage, templates } = useThuso();

  return (
    <>
      <PageHeader
        eyebrow="Settings"
        title="Set Thuso up your way"
        description="Pick the language Thuso should start in, and see how confident it is in each one."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="card-bento">
          <h2 className="font-display text-lg font-bold">Default language</h2>
          <p className="mt-1 mb-5 text-sm text-muted-foreground">
            Every tool opens in this language. You can still switch per task.
          </p>
          <LanguageSelector
            value={defaultLanguage}
            onChange={setDefaultLanguage}
            label="Start in"
          />
        </section>

        <section className="card-bento">
          <h2 className="font-display text-lg font-bold">Language support levels</h2>
          <p className="mt-1 mb-5 text-sm text-muted-foreground">
            Where support is still developing, treat output as a draft and ask a first-language
            speaker to check it.
          </p>
          <div className="space-y-4">
            {(["strong", "developing"] as const).map((level) => (
              <div key={level}>
                <p className="label-mono">
                  {level === "strong" ? "Strong support" : "Developing — please review"}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {LANGUAGES.filter((l) => l.confidence === level).map((l) => (
                    <LanguagePill key={l.code} code={l.code} size="sm" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card-bento lg:col-span-2">
          <h2 className="font-display text-lg font-bold">Responsible AI notice</h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/80">{RESPONSIBLE_AI_NOTICE}</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>Thuso drafts; you decide. Read every output before it leaves your hands.</li>
            <li>
              Do not paste personal information, ID numbers or payroll details you would not put in
              a shared document.
            </li>
            <li>
              Translations into developing-support languages need a first-language reviewer for
              anything about safety, pay or discipline.
            </li>
            <li>
              Research summaries are starting points. Verify facts, dates and figures against the
              original source.
            </li>
          </ul>
        </section>

        <section className="card-bento lg:col-span-2">
          <h2 className="font-display text-lg font-bold">Saved templates</h2>
          {templates.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">
              Nothing saved yet. Generate an email you like and choose "Save as template" — it will
              wait for you here.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {templates.map((t) => (
                <li key={t.id} className="rounded-2xl bg-surface/70 p-4">
                  <p className="font-medium">{t.title}</p>
                  <p className="mt-1 line-clamp-3 text-sm whitespace-pre-line text-muted-foreground">
                    {t.body}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
