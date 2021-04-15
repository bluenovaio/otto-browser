import * as playwright from 'playwright';

import logger from '../lib/logger';
import * as action from './action';
import { Action } from './actionTypes';

export type RunTime = 'chromium'
  | 'webkit'
  | 'firefox';

export interface Config {
  runTime: RunTime;
  baseURL?: string;
}

function getRunTime (runTime: RunTime) {
  switch (runTime) {
    case 'webkit':
      return playwright.webkit;
    case 'firefox':
      return playwright.firefox;
    case 'chromium':
    default:
      return playwright.chromium;
  }
}

export async function run (config: Config, actions: Action[]): Promise<unknown> {
  const runTime = getRunTime(config.runTime);
  const browser = await runTime.launch();
  const page = await browser.newPage();
  let result;

  try {
    result = await action.runAll(page, actions);
  } catch (err) {
    logger.error(err.message);
  }

  await browser.close();
  return result;
}
