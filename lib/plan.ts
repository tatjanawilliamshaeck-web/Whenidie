import { CHAPTER_META, LEVEL_UNLOCK_PCT, QUESTIONS, type Question } from "@/lib/questions";

export type AnswerRecord = { value: string; updated_at: string };
export type AnswersMap = Record<string, AnswerRecord>;

export type ParsedAnswer =
  | string
  | { choice?: string; story?: string; primary?: string };

export function parseAnswerValue(question: Question, value: string): ParsedAnswer | null {
  if (!value) return null;
  const needsJson =
    question.fieldType === "choice_with_story" || question.fieldType === "short_text_story";
  if (needsJson && value.charAt(0) === "{") {
    try {
      return JSON.parse(value);
    } catch {
      // fall through to raw string
    }
  }
  return value;
}

export function hasAnswerValue(question: Question, value: string): boolean {
  if (!value) return false;
  const parsed = parseAnswerValue(question, value);
  if (parsed && typeof parsed === "object") {
    if (parsed.choice !== undefined) return !!parsed.choice;
    if (parsed.primary !== undefined) return !!String(parsed.primary).trim();
  }
  return !!String(value).trim();
}

export function getDisplayValue(question: Question, value: string): string {
  if (!value) return "";
  const parsed = parseAnswerValue(question, value);
  if (parsed && typeof parsed === "object") {
    if (parsed.choice !== undefined) {
      const parts = [parsed.choice];
      if (parsed.story) parts.push(parsed.story);
      return parts.join("\n\n");
    }
    if (parsed.primary !== undefined) {
      const parts = [parsed.primary];
      if (parsed.story) parts.push(parsed.story);
      return parts.join("\n\n");
    }
  }
  return String(value);
}

export function getAnswerFor(answers: AnswersMap, question: Question): string {
  return answers[question.id]?.value || "";
}

export function getAnsweredCount(answers: AnswersMap): number {
  return QUESTIONS.filter((q) => hasAnswerValue(q, getAnswerFor(answers, q))).length;
}

export type ChapterProgress = {
  level: number;
  name: string;
  tagline: string;
  completionMessage: string;
  icon: string;
  questions: Question[];
  answered: number;
  total: number;
  pct: number;
  isComplete: boolean;
  isUnlocked: boolean;
};

export function getQuestionsByChapter(answers: AnswersMap): ChapterProgress[] {
  const byLevel = new Map<number, Question[]>();
  for (const q of QUESTIONS) {
    const list = byLevel.get(q.chapter) || [];
    list.push(q);
    byLevel.set(q.chapter, list);
  }

  const level1 = (byLevel.get(1) || []).slice().sort((a, b) => a.order - b.order);
  const level1Answered = level1.filter((q) => hasAnswerValue(q, getAnswerFor(answers, q))).length;
  const level1Pct = level1.length > 0 ? level1Answered / level1.length : 0;
  const basicAdultingUnlocked = level1Pct >= LEVEL_UNLOCK_PCT;

  return CHAPTER_META.map((meta) => {
    const questions = (byLevel.get(meta.level) || []).slice().sort((a, b) => a.order - b.order);
    const answered = questions.filter((q) => hasAnswerValue(q, getAnswerFor(answers, q))).length;
    const total = questions.length;
    const pct = total > 0 ? answered / total : 0;
    return {
      level: meta.level,
      name: meta.name,
      tagline: meta.tagline,
      completionMessage: meta.completionMessage,
      icon: meta.icon,
      questions,
      answered,
      total,
      pct,
      isComplete: total > 0 && answered === total,
      isUnlocked: meta.level === 1 || basicAdultingUnlocked,
    };
  });
}

export function getQuestionsByCategory(): { category: string; questions: Question[] }[] {
  const byCat = new Map<string, Question[]>();
  for (const q of QUESTIONS) {
    const list = byCat.get(q.category) || [];
    list.push(q);
    byCat.set(q.category, list);
  }
  const order: string[] = CHAPTER_META.map((m) => m.name);
  const extra = Array.from(byCat.keys()).filter((c) => !order.includes(c));
  return [...order, ...extra].filter((c) => byCat.has(c)).map((c) => ({ category: c, questions: byCat.get(c)! }));
}

export function questionIdsForCategories(categories: string[]): string[] {
  return QUESTIONS.filter((q) => categories.includes(q.category)).map((q) => q.id);
}

export function categoriesForQuestionIds(ids: string[]): string[] {
  const set = new Set(QUESTIONS.filter((q) => ids.includes(q.id)).map((q) => q.category));
  return Array.from(set);
}

export function getFirstQuestionIndexForChapter(chapterNum: number): number {
  const idx = QUESTIONS.findIndex((q) => q.chapter === chapterNum);
  return idx >= 0 ? idx : 0;
}

export function getNextUnansweredIndex(answers: AnswersMap, fromIndex: number): number {
  for (let i = fromIndex + 1; i < QUESTIONS.length; i++) {
    if (!hasAnswerValue(QUESTIONS[i], getAnswerFor(answers, QUESTIONS[i]))) return i;
  }
  for (let j = 0; j < fromIndex; j++) {
    if (!hasAnswerValue(QUESTIONS[j], getAnswerFor(answers, QUESTIONS[j]))) return j;
  }
  return -1;
}

export type PlanSection = {
  level: number;
  name: string;
  icon: string;
  answered: number;
  total: number;
  items: { title: string; value: string }[];
};

export function getPlanSections(answers: AnswersMap): PlanSection[] {
  return getQuestionsByChapter(answers).map((chapter) => {
    const items: { title: string; value: string }[] = [];
    for (const q of chapter.questions) {
      const val = getAnswerFor(answers, q);
      if (!hasAnswerValue(q, val)) continue;
      items.push({ title: q.title, value: getDisplayValue(q, val) });
    }
    return {
      level: chapter.level,
      name: chapter.name,
      icon: chapter.icon,
      answered: chapter.answered,
      total: chapter.total,
      items,
    };
  });
}

export function getPlanText(answers: AnswersMap): string {
  const parts: string[] = [];
  for (const q of QUESTIONS) {
    const val = getAnswerFor(answers, q);
    if (!hasAnswerValue(q, val)) continue;
    parts.push(`${q.title}\n${getDisplayValue(q, val)}`);
  }
  return parts.length ? parts.join("\n\n") : "No answers yet.";
}

export const INVITE_MESSAGE_TEMPLATES: Record<string, string | string[]> = {
  responsible:
    "Hey — I did a responsible adult thing.\n\nI put some important info in one place in case something ever happens to me.\n\nYou're the person I trust with access if needed.",
  funny:
    "Hey — if I ever get hit by a bus, abducted by aliens, or just forget all my passwords…\n\nThis has the important stuff.\n\nYou're my designated \"person who knows things.\"",
  sweet:
    "Hey — I set up a secure place with some important information in case something ever happens to me.\n\nI added you because I trust you.",
  smartass:
    "If I disappear mysteriously, please don't let my internet history define my legacy.\n\nThis has the important information.\n\nYou're the chosen one.",
  surprise: [
    "If I ever vanish into the woods to start a new life, this has the important stuff.\n\nYou are my chosen adult.",
    "I organized my life like a grown-up.\n\nPlease act surprised.",
    "In case of emergency, break glass — or just open this link.\n\nYou're the one I trust with the glass-breaking.",
    "If I ever get hit by a bus, abducted by aliens, or just forget all my passwords… This has the important stuff. You're my designated \"person who knows things.\"",
    "I have achieved peak adulthood. I organized my important life info. You are now the emergency contact for my existence.",
  ],
};

export const INVITE_SUCCESS_TOASTS = [
  "Invite sent. Nice. Responsible AND mysterious.",
  "Done. You've officially done more planning than 95% of people.",
  "Sent. Your future self is already thanking you.",
  "They're in. Now go have a snack.",
];

export const RELIEF_HUMOR_LINES = [
  "You just became one of the most responsible people on the internet today.",
  "Congrats. Your future family just avoided a week of password-guessing.",
  "Nice work. You've officially done more planning than 90% of people.",
  "Life Admin Achievement: Future Chaos Prevented.",
];
