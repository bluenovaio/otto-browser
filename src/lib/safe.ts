export async function execAsync<A extends unknown[], R extends unknown> (fn: {(...args: A): Promise<R>}, ...args: A): Promise<[Error | null, R | null]> {
  try {
    return [null, await fn(...args)];
  } catch (err) {
    return [err, null];
  }
}

export function exec<A extends unknown[], R extends unknown> (fn: {(...args: A): R}, ...args: A): [Error | null, R | null] {
  try {
    return [null, fn(...args)];
  } catch (err) {
    return [err, null];
  }
}

export function JSONParse (value: unknown): JSON | null {
  try {
    return JSON.parse(value as string);
  } catch (err) {
    return null;
  }
}
