const JOB_TYPE_LABELS: Record<string, string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACT: "Contract",
  INTERNSHIP: "Internship",
  TEMPORARY: "Temporary",
};

export function formatJobType(type: string): string {
  return JOB_TYPE_LABELS[type] ?? type;
}

export function formatSalaryRange(min: number | null, max: number | null): string {
  const toK = (n: number) => `$${Math.round(n / 1000)}k`;
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