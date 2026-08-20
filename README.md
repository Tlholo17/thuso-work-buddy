# Thuso AI: Your Workplace Helper

Build a modern, responsive web application called "Thuso AI" — a multilingual AI-

powered workplace productivity assistant for South African professionals. The name

"Thuso" means "help" in Sesotho, so the whole product should feel like a warm,

capable helper — not a stiff corporate enterprise tool.

IMPORTANT SCOPE NOTE: build this as a fully working front-end app using realistic

SAMPLE DATA and SIMULATED AI responses only. Do not connect to any external AI API,

database, or backend service. Every "AI" output should come from pre-written

sample responses or simple local logic (e.g. template strings, basic keyword

matching, or randomised picks from a set of realistic pre-written outputs) so the

whole app runs entirely in the browser with no API keys and no backend setup.

PRODUCT SUMMARY

Thuso AI is ONE integrated platform (single dashboard, not separate apps) that

brings together AI-powered workplace tools with support for South Africa's 11

official languages (English, Afrikaans, isiZulu, isiXhosa, Sepedi, Setswana,

Sesotho, siSwati, Xitsonga, Tshivenda, isiNdebele).

PAGES / FEATURES TO BUILD (all inside the dashboard, all fully click-through)

1. Daily Brief (default home page after "login" — no real auth needed, just land

   here) — a feed showing 3-4 sample pending action items, 2 sample drafted

   emails awaiting review, and 4-5 sample prioritised tasks for today, pulled

   from realistic placeholder content, not empty placeholders

2. Smart Email Generator

   - Input: purpose of email (textarea), tone selector (Professional, Formal,

     Friendly, Persuasive), language selector (all 11 languages, shown as pills)

   - On "Generate," show a short simulated loading state (1-2 seconds), then

     display a realistic, well-written sample email in an editable text box

     matching the chosen tone (write 4 different realistic sample emails, one

     per tone, and swap between them based on the tone selected)

   - Copy, Regenerate (cycles to a slightly different sample), and "Save as

     template" buttons, all functional in the UI (regenerate can just reshuffle

     between 2-3 sample variants)

3. Meeting Notes Summarizer

   - Input: paste meeting notes (textarea, pre-filled with a realistic sample

     you write), input/output language selectors

   - On "Summarize," show a structured output: Summary, Key Decisions, Action

     Items (each with a "Send to Task Planner" button that actually adds it to

     the Task Planner page's state), Deadlines, Responsible People, Follow-ups

   - Use one well-written realistic sample summary as the output

4. AI Task Planner

   - A task board grouped by High / Medium / Low priority

   - Pre-populate with 5-6 realistic sample tasks plus any items sent over from

     the Meeting Summarizer (shared app state, no backend needed — just React

     state/context)

   - Include a short plain-language "why this was prioritised" note per task

   - Show a simple suggested daily schedule list below the board

5. AI Research Assistant

   - Input: topic or pasted article text, output language selector

   - On "Research," show a structured sample output: key points, a "plain

     terms" explainer, and 3-5 actionable recommendations, plus a source-note

     area and a small disclaimer that this is an AI-generated summary

   - Write one strong, realistic sample output

6. Multilingual AI Workplace Assistant (chatbot)

   - Persistent chat launcher (bottom-right) + full chat page

   - Pre-script 6-8 realistic exchanges (user message + assistant reply) covering

     writing help, translation, meeting prep, and general productivity questions

   - If the user types something not in the script, show a friendly generic

     response acknowledging the request rather than an error

STRUCTURE REQUIREMENTS

- Persistent left sidebar navigation with icons + labels for: Daily Brief, Email

  Generator, Meeting Summarizer, Task Planner, Research Assistant, Assistant

  (chat), Settings

- Fully responsive: sidebar collapses into a bottom tab bar or hamburger drawer

  on mobile; all input/output panels stack vertically on small screens

- Every AI output shown in an editable field (not locked text), with Copy and

  Regenerate actions

- Clear loading states (skeleton or friendly progress messages, not a generic

  spinner) using a short local delay (setTimeout), and one example error state

  with plain-language recovery guidance

- A visible Responsible AI disclaimer footer/banner: "AI-generated content may

  contain inaccuracies or bias. Please review before using for important

  workplace decisions or communication. For translations, treat uncertain

  results as a draft, not a final version."

- A small confidence indicator next to the language selector (e.g. "Strong

  support" for English/Afrikaans/isiZulu/isiXhosa, "Developing — please review"

  for the others) — this can be a static lookup table in the code, no logic

  needed

- A Settings page with a default-language selector and the full Responsible AI

  notice text

DESIGN DIRECTION — this is not a generic SaaS look

The brand should feel young, modern, confident, and distinctly South African —

warm and human rather than corporate or "enterprise software" stiff, while still

reading as professional and trustworthy.

Color palette (use as CSS variables):

- Canvas / base background: warm bone-white #FAF8F4

- Ink / primary text: deep aubergine-charcoal #211829

- Primary accent (main CTAs, highlights): marigold-amber #F2A93B

- Secondary/depth color (sidebar, header, dark sections): rich plum-violet #4B2E6F

- Tertiary accent (success states, secondary actions): emerald-teal #1FA97E

- Card/surface background (alternating with canvas): soft lavender-grey #EDE9F2

Typography:

- Display/heading font: a bold, geometric sans with personality and rounded

  terminals (e.g. Clash Display, Bricolage Grotesque, or General Sans Bold)

- Body font: a clean humanist sans (e.g. General Sans or Inter)

- Utility/data font: a monospace (e.g. Space Mono or JetBrains Mono) for small

  labels, timestamps, and language codes

Layout:

- Bento-grid style dashboard cards with generously rounded corners (16-20px),

  soft layered shadows instead of hard borders

- Generous whitespace, comfortable line-height

- Sidebar uses the plum-violet background with white/cream text and an amber

  highlight for the active item

Signature element (make this the one memorable, recognizable piece of the UI):

Language is shown throughout the app as tactile, rounded "pills" — small colored

chips with the language name — used for the language selector, the confidence

indicator, and anywhere a language is referenced. Give each of the 11 languages

a consistent, distinct pill color used everywhere it appears.

Motion: subtle only — a gentle fade/slide when AI output appears, a soft pulse

on the chat launcher when a new suggestion is ready.

Voice and copy: plain, active, second-person language. Buttons say what they do

("Generate email," "Send to Task Planner," not "Submit"). Empty states feel like

an invitation, not a blank silence. Error messages explain what happened and

what to do next.


the application must include the following features:

 

 1. Smart Email Generator

	•	Generate professional emails

	•	Support different tones (formal, friendly, persuasive)

2.⁠ ⁠Meeting Notes Summarizer

	•	Summarize long notes

	•	Extract action items, decisions, and deadlines

3.⁠ ⁠AI Task Planner / Scheduler

	•	Generate daily or weekly schedules

	•	Prioritize tasks effectively

4.⁠ ⁠AI Research Assistant

	•	Summarize topics/articles

	•	Provide insights and recommendations

5.⁠ ⁠AI Chatbot Interface

	•	Interactive AI workplace assistant

	•	Handle user prompts and responses

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/396a49e1-7b66-41ad-8452-628f0e3af0de).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
