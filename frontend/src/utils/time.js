const UNITS = [
  { limit: 60, divisor: 1, label: "s" },
  { limit: 3600, divisor: 60, label: "m" },
  { limit: 86400, divisor: 3600, label: "h" },
  { limit: 604800, divisor: 86400, label: "d" },
  { limit: 2629800, divisor: 604800, label: "w" },
  { limit: 31557600, divisor: 2629800, label: "mo" },
];

export function timeAgo(date) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

  if (seconds < 5) return "just now";

  for (const { limit, divisor, label } of UNITS) {
    if (seconds < limit) {
      return `${Math.floor(seconds / divisor)}${label} ago`;
    }
  }

  const years = Math.floor(seconds / 31557600);
  return `${years}y ago`;
}
