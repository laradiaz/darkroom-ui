/** "StampGreenStraight" → "Stamp Green Straight" */
export function formatStoryName(exportName: string): string {
  return exportName
    .replace(/([A-Z])/g, " $1")
    .replace(/^\s+/, "")
    .trim();
}
