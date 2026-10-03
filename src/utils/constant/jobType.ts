// Frontend: utils/constant/jobType.ts
// One home for everything job-related: values, labels, limits and display helpers.
// Values mirror the Prisma enums on the backend. This file has no imports.

/* ---------- values ---------- */

export const JOB_TYPES = [
  "FULL_TIME",
  "PART_TIME",
  "CONTRACT",
  "INTERNSHIP",
  "TEMPORARY",
] as const;
export type JobType = (typeof JOB_TYPES)[number];

export const JOB_STATUSES = ["DRAFT", "OPEN", "CLOSED"] as const;
export type JobStatus = (typeof JOB_STATUSES)[number];

// A job can only be created as a draft or published; "CLOSED" comes later.
export const CREATABLE_JOB_STATUSES = ["DRAFT", "OPEN"] as const;

export const QUESTION_TYPES = [
  "SHORT_TEXT",
  "LONG_TEXT",
  "SINGLE_CHOICE",
  "MULTI_CHOICE",
  "YES_NO",
  "NUMBER",
  "DATE",
] as const;
export type QuestionType = (typeof QUESTION_TYPES)[number];

/* ---------- labels ---------- */

export const JOB_TYPE_LABELS: Record<JobType, string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACT: "Contract",
  INTERNSHIP: "Internship",
  TEMPORARY: "Temporary",
};

export const JOB_STATUS_LABELS: Record<JobStatus, string> = {
  DRAFT: "Draft",
  OPEN: "Open",
  CLOSED: "Closed",
};

export const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  SHORT_TEXT: "Short answer",
  LONG_TEXT: "Paragraph",
  SINGLE_CHOICE: "Single choice",
  MULTI_CHOICE: "Multiple choice",
  YES_NO: "Yes / No",
  NUMBER: "Number",
  DATE: "Date",
};

// Ready for <select>: JOB_TYPE_OPTIONS.map(o => <option value={o.value}>{o.label}</option>)
export const JOB_TYPE_OPTIONS = JOB_TYPES.map((value) => ({
  value,
  label: JOB_TYPE_LABELS[value],
}));

/* ---------- display + limits ---------- */

export const CURRENCY_SYMBOL = "$"; // change to your currency

export const MAX_QUESTIONS = 10;
export const MAX_OPTIONS = 20;
export const DESCRIPTION_MIN = 20;

/* ---------- helpers ---------- */

export const isChoiceQuestion = (t: QuestionType) =>
  t === "SINGLE_CHOICE" || t === "MULTI_CHOICE";

// Accepts string because API data isn't guaranteed to match the union at runtime.
export function formatJobType(type: string): string {
  return JOB_TYPE_LABELS[type as JobType] ?? type;
}

export function formatSalaryRange(min: number | null, max: number | null): string {
  const toK = (n: number) => `${CURRENCY_SYMBOL}${Math.round(n / 1000)}k`;
  if (min != null && max != null) return `${toK(min)} – ${toK(max)}`;
  if (min != null) return `From ${toK(min)}`;
  if (max != null) return `Up to ${toK(max)}`;
  return "Salary not specified";
}

export function formatRelativeTime(isoDate: string): string {
  const seconds = Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000);
  const units: [string, number][] = [
    ["y", 31536000],
    ["mo", 2592000],
    ["d", 86400],
    ["h", 3600],
    ["m", 60],
  ];
  for (const [label, secondsInUnit] of units) {
    const count = Math.floor(seconds / secondsInUnit);
    if (count >= 1) return `${count}${label} ago`;
  }
  return "just now";
}

export function isRecentlyPosted(isoDate: string, withinDays = 3): boolean {
  const daysSince = (Date.now() - new Date(isoDate).getTime()) / 86400000;
  return daysSince <= withinDays;
}