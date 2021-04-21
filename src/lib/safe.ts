export function JSONParse (value: unknown): JSON | null {
  try {
    return JSON.parse(value as string);
  } catch (err) {
    return null;
  }
}
