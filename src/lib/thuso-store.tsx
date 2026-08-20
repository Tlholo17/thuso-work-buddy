import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { LanguageCode } from "./thuso-data";

export type Priority = "High" | "Medium" | "Low";

export type Task = {
  id: string;
  title: string;
  owner: string;
  due: string;
  priority: Priority;
  reason: string;
  done: boolean;
  fromMeeting?: boolean;
};

const SEED_TASKS: Task[] = [
  {
    id: "t1",
    title: "Approve the Kgomotso Trading Q3 invoice",
    owner: "You",
    due: "Today, 15:00",
    priority: "High",
    reason: "Same-day cut-off — the finance payment run cannot go out without it.",
    done: false,
  },
  {
    id: "t2",
    title: "Send Nedbank the Sandton workshop headcount",
    owner: "You",
    due: "Today, 17:00",
    priority: "High",
    reason: "A client set this deadline, so missing it costs trust, not just time.",
    done: false,
  },
  {
    id: "t3",
    title: "Draft the Friday progress note for Polokwane",
    owner: "You",
    due: "Thursday, 16:00",
    priority: "Medium",
    reason: "You promised a weekly update — doing it early keeps Friday light.",
    done: false,
  },
  {
    id: "t4",
    title: "Review the isiZulu staff safety notice",
    owner: "Nomsa Khumalo",
    due: "Friday, 12:00",
    priority: "Medium",
    reason: "Goes to all staff Monday and the translation has not been checked yet.",
    done: false,
  },
  {
    id: "t5",
    title: "Update the team leave calendar for September",
    owner: "You",
    due: "Next Monday",
    priority: "Low",
    reason: "Useful, but nothing is blocked while it waits.",
    done: false,
  },
  {
    id: "t6",
    title: "Tidy the shared project folder",
    owner: "You",
    due: "This month",
    priority: "Low",
    reason: "Low impact — a good filler task between meetings.",
    done: false,
  },
];

export type Template = { id: string; title: string; body: string };

type ThusoState = {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "done"> & { id?: string }) => void;
  toggleTask: (id: string) => void;
  defaultLanguage: LanguageCode;
  setDefaultLanguage: (code: LanguageCode) => void;
  templates: Template[];
  saveTemplate: (t: Omit<Template, "id">) => void;
};

const ThusoContext = createContext<ThusoState | null>(null);

export function ThusoProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(SEED_TASKS);
  const [defaultLanguage, setDefaultLanguage] = useState<LanguageCode>("en");
  const [templates, setTemplates] = useState<Template[]>([]);

  const addTask = useCallback<ThusoState["addTask"]>((task) => {
    setTasks((prev) => {
      const id = task.id ?? `t-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      if (prev.some((t) => t.id === id)) return prev;
      return [{ ...task, id, done: false }, ...prev];
    });
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }, []);

  const saveTemplate = useCallback<ThusoState["saveTemplate"]>((t) => {
    setTemplates((prev) => [{ ...t, id: `tpl-${prev.length + 1}` }, ...prev]);
  }, []);

  const value = useMemo(
    () => ({
      tasks,
      addTask,
      toggleTask,
      defaultLanguage,
      setDefaultLanguage,
      templates,
      saveTemplate,
    }),
    [tasks, addTask, toggleTask, defaultLanguage, templates, saveTemplate],
  );

  return <ThusoContext.Provider value={value}>{children}</ThusoContext.Provider>;
}

export function useThuso() {
  const ctx = useContext(ThusoContext);
  if (!ctx) throw new Error("useThuso must be used inside ThusoProvider");
  return ctx;
}
