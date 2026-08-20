import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowRightCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  EditableOutput,
  PageHeader,
  ThinkingState,
} from "@/components/thuso/AiOutput";
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
  component: MeetingSummarizer;
});

function MeetingSummarizer() {
  return null;
}
