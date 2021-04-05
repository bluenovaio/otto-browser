import logger from '../lib/logger';

export function exec<T> (cb: {(...args: unknown[]): T | null}, args: unknown[] = []): T | null {
  try {
    // eslint-disable-next-line node/no-callback-literal
    return cb(...args);
  } catch (err) {
    logger.debug(err.message);
    return null;
  }
}

export async function execAsync<T> (cb: {(...args: unknown[]): Promise<T | null>}, args: unknown[] = []): Promise<T | null> {
  try {
    // eslint-disable-next-line node/no-callback-literal
    return await cb(...args);
  } catch (err) {
    logger.debug(err.message);
    return null;
  }
}

export function JSONParse (value: unknown): JSON | null {
  try {
    return JSON.parse(value as string);
  } catch (err) {
    logger.debug(err.message);
    return null;
  }
}
