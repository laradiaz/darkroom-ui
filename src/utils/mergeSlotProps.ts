/** Pull `className` off slot props so it can be merged with styled classes. */
export function splitSlotClassName<T extends { className?: string }>(
  slot?: T,
): { className?: string; rest: Omit<T, "className"> } {
  if (!slot) return { rest: {} as Omit<T, "className"> };
  const { className, ...rest } = slot;
  return { className, rest };
}
