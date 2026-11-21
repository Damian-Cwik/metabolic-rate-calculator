export function formatDateTime(isoDate: string): string {
  return new Date(isoDate).toLocaleString("pl-PL", {
    dateStyle: "short",
    timeStyle: "short",
  });
}
