// @todo switch to pino
export default {
  log (...args: unknown[]): void {
    console.log(...args);
  },
  debug (...args: unknown[]): void {
    console.debug(...args);
    console.trace();
  },
  info (...args: unknown[]): void {
    console.info(...args);
  },
  warn (...args: unknown[]): void {
    console.warn(...args);
  },
  error (...args: unknown[]): void {
    console.error(...args);
  }
};
