import * as React from "react";

let count = 0;
const nextFallbackId = () => `darkroom-id-${++count}`;

// React <18 has no useId; resolved once at module load, so the hook
// called below stays the same across every render in a given app.
const reactUseId = (React as unknown as { useId?: () => string }).useId;

/** `React.useId` on React 18+, falling back to a stable per-mount id on 16.8/17. */
export function useStableId(): string {
  // ponytail: fallback isn't SSR-hydration-safe (counter can drift server vs client).
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return reactUseId ? reactUseId() : React.useState(nextFallbackId)[0];
}
