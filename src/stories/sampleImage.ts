/** Reliable placeholder images for Storybook (picsum.photos). */
export function sampleImage(seed: string, width = 800, height = 600): string {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;
}
