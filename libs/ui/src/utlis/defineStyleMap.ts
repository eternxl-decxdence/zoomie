export function defineStyleMap<T extends string>(
  keys: T[],
  value: string
): Record<T, string> {
  return Object.fromEntries(keys.map((key) => [key, value])) as Record<
    T,
    string
  >
}
