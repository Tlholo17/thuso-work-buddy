export type LanguageCode =
  | "en"
  | "af"
  | "zu"
  | "xh"
  | "nso"
  | "tn"
  | "st"
  | "ss"
  | "ts"
  | "ve"
  | "nr";

export type Language = {
  code: LanguageCode;
  name: string;
  confidence: "strong" | "developing";
};

export const LANGUAGES: Language[] = [
  { code: "en", name: "English", confidence: "strong" },
  { code: "af", name: "Afrikaans", confidence: "strong" },
  { code: "zu", name: "isiZulu", confidence: "strong" },
  { code: "xh", name: "isiXhosa", confidence: "strong" },
  { code: "nso", name: "Sepedi", confidence: "developing" },
  { code: "tn", name: "Setswana", confidence: "developing" },
  { code: "st", name: "Sesotho", confidence: "developing" },
  { code: "ss", name: "siSwati", confidence: "developing" },
  { code: "ts", name: "Xitsonga", confidence: "developing" },
  { code: "ve", name: "Tshivenda", confidence: "developing" },
  { code: "nr", name: "isiNdebele", confidence: "developing" },
];

export const CONFIDENCE_LABEL: Record<Language["confidence"], string> = {
  strong: "Strong support",
  developing: "Developing — please review",
};

export const getLanguage = (code: LanguageCode): Language =>
  LANGUAGES.find((l) => l.code === code) ?? (LANGUAGES[0] as Language);

export const RESPONSIBLE_AI_NOTICE =
  "AI-generated content may contain inaccuracies or bias. Please review before using for important workplace decisions or communication. For translations, treat uncertain results as a draft, not a final version.";

/* ---------------- Daily Brief sample data ---------------- */

export const PENDING_ACTIONS = [
  {
    id: "a1",
    title: "Approve the Q3 supplier invoice from Kgomotso Trading",
    detail: "Finance needs your sign-off before the 15:00 payment run.",
    due: "Today, 15:00",
    tag: "Finance",
  },
  {
    id: "a2",
    title: "Confirm attendance for the Gauteng client workshop",
    detail: "Nedbank Sandton team asked for numbers by end of day.",
    due: "Today, 17:00",
    tag: "Clients",
  },
  {
    id: "a3",
    title: "Review the isiZulu version of the staff safety notice",
    detail: "Translation flagged as developing support — needs a human check.",
    due: "Tomorrow, 09:00",
    tag: "People",
  },
  {
    id: "a4",
    title: "Sign off the load-shedding contingency roster",
    detail: "Operations shared an updated Stage 4 cover plan.",
    due: "Fri, 12:00",
    tag: "Operations",
  },
];

export const DRAFTED_EMAILS = [
  {
    id: "d1",
    to: "Naledi Mokoena — Procurement",
    subject: "Revised delivery timeline for the Polokwane rollout",
    preview:
      "Hi Naledi, thank you for flagging the delay. We have reworked the schedule so installation now starts on 2 September…",
    tone: "Professional",
    language: "en" as LanguageCode,
  },
  {
    id: "d2",
    to: "Span personeel — Kaapstad kantoor",
    subject: "Nuwe kantoorure vanaf Maandag",
    preview:
      "Goeiedag almal, vanaf Maandag begin ons om 08:00 en sluit om 16:30 om reistyd in spitsverkeer te verminder…",
    tone: "Friendly",
    language: "af" as LanguageCode,
  },
];

/* ---------------- Email generator samples ---------------- */

export type Tone = "Professional" | "Formal" | "Friendly" | "Persuasive";
export const TONES: Tone[] = ["Professional", "Formal", "Friendly", "Persuasive"];

export const EMAIL_SAMPLES: Record<Tone, string[]> = {
  Professional: [
    `Subject: Revised delivery timeline for the Polokwane rollout

Hi Naledi,

Thank you for flagging the delay on last week's shipment. I have reworked the schedule with our logistics partner and can confirm the following:

• Hardware arrives in Polokwane on 28 August
• Installation runs from 2 to 5 September
• Handover and staff training is set for 8 September

Nothing else on the project plan shifts, and the go-live date stays as agreed. I will send a short progress note every Friday so your team can plan around it.

Please let me know by Thursday if these dates work on your side.

Kind regards,
Thlolelo`,
    `Subject: Updated project dates — Polokwane rollout

Hi Naledi,

Following up on the delay you raised, here is where things stand. Stock lands in Polokwane on 28 August, installation happens between 2 and 5 September, and we hand over to your team on 8 September.

The go-live date is unchanged. I will keep you posted with a short update each Friday afternoon.

Could you confirm the dates by Thursday so I can lock in the installers?

Kind regards,
Thlolelo`,
  ],
  Formal: [
    `Subject: Notification of revised project schedule — Polokwane implementation

Dear Ms Mokoena,

I write to confirm the revised implementation schedule for the Polokwane site, following the supply delay reported on 12 August.

Delivery of hardware is scheduled for 28 August 2026. Installation will be undertaken between 2 and 5 September 2026, with formal handover and user training on 8 September 2026. The contracted go-live date remains unchanged.

A written progress report will be issued weekly for the duration of the implementation. Should any of the above dates present a difficulty, kindly advise in writing by Thursday, 21 August 2026.

Yours sincerely,
Thlolelo
Project Lead`,
    `Subject: Revised implementation schedule for your attention

Dear Ms Mokoena,

Further to our correspondence regarding the supply delay, please find the amended schedule below for your records.

Hardware delivery: 28 August 2026
Installation period: 2 – 5 September 2026
Handover and training: 8 September 2026

The agreed go-live date is not affected. We would appreciate written confirmation of these arrangements by Thursday, 21 August 2026.

Yours sincerely,
Thlolelo
Project Lead`,
  ],
  Friendly: [
    `Subject: Good news on the Polokwane dates 🎉

Hi Naledi,

Thanks for your patience while we sorted out the delay — I have good news. The stock lands in Polokwane on 28 August, the team installs from 2 to 5 September, and we hand everything over on 8 September.

Best part: go-live does not move at all. I will drop you a quick note every Friday so you are never guessing where we are.

Do these dates work for you? A quick yes by Thursday and I will book the installers.

Chat soon,
Thlolelo`,
    `Subject: Polokwane update — we're back on track

Hi Naledi,

Quick one to say the delay is sorted. Delivery is 28 August, installation runs 2–5 September, and your team gets the walkthrough on 8 September.

Go-live stays exactly where it was. I will keep the Friday updates coming so nothing catches you by surprise.

Shout if the dates clash with anything on your side — otherwise I will get the installers booked.

Enjoy the rest of your week,
Thlolelo`,
  ],
  Persuasive: [
    `Subject: One decision this week keeps Polokwane on time

Hi Naledi,

The delay is behind us, and we now have a clear runway: delivery on 28 August, installation 2–5 September, handover on 8 September — with go-live still exactly where we promised it.

Holding these dates means your branch teams train before month-end reporting starts, instead of during it. Installers are in high demand this season, so the slot is only ours if we confirm by Thursday.

Give me a yes by Thursday and I will lock it in today. If anything about the plan worries you, call me and we will work around it.

Warm regards,
Thlolelo`,
    `Subject: Let's lock in Polokwane before the slot goes

Hi Naledi,

We have recovered the lost time — 28 August delivery, 2–5 September installation, 8 September handover, and go-live untouched.

Confirming this week gives your staff a full training run before month-end, and protects the installation crew we have reserved. If we wait, the next available window pushes us into late September.

Reply "go" by Thursday and I will handle the rest.

Warm regards,
Thlolelo`,
  ],
};

/* ---------------- Meeting summarizer ---------------- */

export const SAMPLE_MEETING_NOTES = `Weekly operations sync — 18 August 2026, 09:00, Boardroom 2 / Teams
Present: Thlolelo (chair), Naledi Mokoena (procurement), Sipho Dlamini (ops), Ayanda Nkosi (people), Riaan de Beer (finance)

Sipho reported that the Polokwane hardware delay is resolved, stock lands 28 Aug. He asked whether installers are confirmed - Naledi said the crew is on hold until we confirm dates by Thursday.
Riaan raised that the Q3 supplier invoice from Kgomotso Trading is still unapproved and blocking the payment run. Needs sign-off today before 15:00.
Ayanda flagged that the staff safety notice was translated into isiZulu and isiXhosa but nobody has checked the isiZulu version. She suggested Nomsa reviews it before it goes out Monday.
Load shedding: Stage 4 expected next week. Sipho to circulate the contingency roster by Friday. Agreed that the Cape Town office moves to 08:00-16:30 hours for the next two weeks.
Client workshop in Sandton - numbers due to Nedbank by close of business today. Ayanda to collect RSVPs.
Decided not to move the go-live date. Decided to run Friday progress notes for the whole implementation.
Next meeting 25 August, same time.`;

export const MEETING_SUMMARY = {
  summary:
    "The Polokwane hardware delay has been resolved, with stock arriving 28 August and go-live unchanged. The team must confirm installation dates by Thursday to keep the reserved crew. Finance is blocked on an unapproved Q3 invoice, and the isiZulu safety notice still needs a human review before Monday. Stage 4 load shedding is expected next week, so Cape Town shifts to 08:00–16:30 hours and a contingency roster goes out on Friday.",
  decisions: [
    "The Polokwane go-live date stays as agreed — no change to the client commitment.",
    "A short written progress note goes out every Friday for the full implementation.",
    "Cape Town office hours move to 08:00–16:30 for the next two weeks during Stage 4.",
  ],
  actionItems: [
    {
      id: "m1",
      title: "Confirm Polokwane installation dates with the crew",
      owner: "Naledi Mokoena",
      due: "Thursday, 20 August",
      priority: "High" as const,
      reason: "The reserved installation crew is released if we do not confirm by Thursday.",
    },
    {
      id: "m2",
      title: "Approve the Kgomotso Trading Q3 invoice",
      owner: "Thlolelo",
      due: "Today, 15:00",
      priority: "High" as const,
      reason: "It is blocking the whole payment run and has a same-day cut-off.",
    },
    {
      id: "m3",
      title: "Ask Nomsa to review the isiZulu safety notice",
      owner: "Ayanda Nkosi",
      due: "Friday, 21 August",
      priority: "Medium" as const,
      reason: "Safety wording goes to all staff on Monday and the translation is unverified.",
    },
    {
      id: "m4",
      title: "Circulate the Stage 4 load-shedding contingency roster",
      owner: "Sipho Dlamini",
      due: "Friday, 21 August",
      priority: "Medium" as const,
      reason: "Teams need cover arrangements before load shedding starts next week.",
    },
    {
      id: "m5",
      title: "Collect Sandton workshop RSVPs and send numbers to Nedbank",
      owner: "Ayanda Nkosi",
      due: "Today, 17:00",
      priority: "High" as const,
      reason: "The client set a close-of-business deadline for headcount.",
    },
  ],
  deadlines: [
    "Today 15:00 — Kgomotso Trading invoice approval",
    "Today 17:00 — Nedbank workshop numbers",
    "Thursday 20 August — installation dates confirmed",
    "Friday 21 August — contingency roster and translation review",
    "28 August — Polokwane hardware delivery",
  ],
  people: [
    { name: "Naledi Mokoena", role: "Procurement — installer confirmation" },
    { name: "Sipho Dlamini", role: "Operations — load-shedding roster" },
    { name: "Ayanda Nkosi", role: "People — translations and RSVPs" },
    { name: "Riaan de Beer", role: "Finance — payment run" },
    { name: "Thlolelo", role: "Chair — invoice sign-off and client comms" },
  ],
  followUps: [
    "Next operations sync on 25 August, 09:00, Boardroom 2 / Teams.",
    "Add a standing agenda item for translation quality checks.",
    "Share the first Friday progress note template with the client.",
  ],
};

/* ---------------- Research assistant ---------------- */

export const RESEARCH_OUTPUT = {
  keyPoints: [
    "South African employers are moving to hybrid work policies that are written down and measurable, rather than informal team-by-team arrangements.",
    "Load shedding remains the single biggest driver of home-office cost policies, with data and inverter allowances now common in medium-sized firms.",
    "Language access is becoming a compliance issue: internal notices that affect safety or pay are expected to reach staff in a language they understand.",
    "Productivity is increasingly measured on delivered outcomes and response times, not on hours logged at a desk.",
    "Tools that work offline or on low bandwidth get far higher adoption in distributed South African teams.",
  ],
  plainTerms:
    "In plain terms: hybrid work in South Africa only works when the rules are written down, when staff can actually stay online during load shedding, and when important messages reach people in a language they are comfortable in. Teams that get this right measure results, not desk time — and they choose tools that keep working when the power and the signal do not.",
  recommendations: [
    "Write a one-page hybrid policy that states core collaboration hours, response-time expectations, and who approves exceptions.",
    "Budget a monthly connectivity and power allowance per remote staff member, and review it every six months.",
    "Translate all safety, pay, and policy notices into the two or three languages most used by your staff, with a named human reviewer for each.",
    "Replace time-tracking with a weekly outcomes check-in that lists what shipped and what is blocked.",
    "Pilot any new tool with one team for four weeks, on their real bandwidth, before rolling it out company-wide.",
  ],
  sources: [
    "Sample source note — Department of Employment and Labour guidance on remote work arrangements (illustrative)",
    "Sample source note — Industry survey of hybrid work practices in South African firms (illustrative)",
    "Sample source note — Internal Thuso AI research digest, August 2026 (illustrative)",
  ],
};

/* ---------------- Chat script ---------------- */

export const CHAT_SCRIPT: { keywords: string[]; reply: string }[] = [
  {
    keywords: ["translate", "isizulu", "zulu", "afrikaans", "xhosa", "translation"],
    reply:
      "Here is an isiZulu draft of your notice:\n\n**\"Sicela bonke abasebenzi baqaphele ukuthi amahora omsebenzi ashintshile. Sizoqala ngo-08:00 futhi siphume ngo-16:30 kusukela ngoMsombuluko.\"**\n\nThis language has strong support, but please still have a first-language speaker glance over it before it goes to all staff — treat it as a solid draft, not a final version.",
  },
  {
    keywords: ["email", "write", "draft", "reply to"],
    reply:
      "Happy to help. Here is a short, professional opener you can build on:\n\n\"Hi Naledi, thank you for flagging the delay. I have reworked the schedule and the new dates are below — the go-live date is unchanged.\"\n\nWant me to make it warmer, more formal, or more persuasive? You can also open the Email Generator for a full draft with tone and language options.",
  },
  {
    keywords: ["meeting", "prep", "agenda", "prepare"],
    reply:
      "For tomorrow's operations sync, I would prepare three things:\n\n1. **Status** — Polokwane delivery confirmed for 28 August, go-live unchanged.\n2. **Decisions needed** — installer confirmation before Thursday, and sign-off on the Stage 4 roster.\n3. **Risks** — the unverified isiZulu safety notice going out Monday.\n\nKeep it to fifteen minutes and end with owners and dates for each item.",
  },
  {
    keywords: ["summar", "notes", "minutes"],
    reply:
      "Paste the notes into the Meeting Summarizer and you will get a summary, key decisions, action items, deadlines, and responsible people. Each action item has a **Send to Task Planner** button so it lands on your board with a priority already suggested.",
  },
  {
    keywords: ["prioriti", "busy", "overwhelm", "focus", "task"],
    reply:
      "Start with the two items that have same-day cut-offs: the Kgomotso invoice before 15:00 and the Nedbank workshop numbers before 17:00. Everything else on your board can move without breaking a promise to someone else.\n\nAfter those, protect a 90-minute block for the Polokwane confirmation — it is the item most likely to cost you a week if it slips.",
  },
  {
    keywords: ["load shedding", "power", "stage 4", "eskom"],
    reply:
      "For Stage 4 next week: publish the cover roster by Friday, move deadlines off the two-hour slots that hit most of the team, and ask staff to download anything they need the night before. It also helps to agree one asynchronous channel so nobody is blocked waiting for a live call.",
  },
  {
    keywords: ["leave", "policy", "hr", "salary"],
    reply:
      "I can help you draft the wording, but check the final version against your company's HR policy and the Basic Conditions of Employment Act before you send it. Would you like a plain-language staff notice or a formal policy paragraph?",
  },
  {
    keywords: ["research", "article", "trend", "summarise topic"],
    reply:
      "Drop the topic or paste the article into the Research Assistant and I will give you key points, a plain-terms explainer, and a few actionable recommendations — plus a source note area so you can record where the material came from.",
  },
];

export const CHAT_FALLBACK =
  "Got it — I have made a note of that. I do not have a prepared answer for this one, but here is how I would approach it: break the request into a first small step you can finish today, then tell me what changed and we will take it from there. You can also try the Email Generator, Meeting Summarizer, Task Planner, or Research Assistant for a more structured hand.";

export const CHAT_STARTERS = [
  "Help me reply to a delayed supplier",
  "Translate our new office hours into isiZulu",
  "Prep me for tomorrow's operations sync",
  "What should I do first today?",
];
