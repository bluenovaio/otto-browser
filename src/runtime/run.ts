import * as playwright from 'playwright';

import { Action, ActionResult } from './actionTypes';
import * as action from './action';

export type RunTime = 'chromium' | 'webkit' | 'firefox';

function getRunTime(runTime: RunTime) {
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

// ===========================
// ======== RunTime ==========
// ===========================

export interface RunConfig {
  runTime: RunTime;
  baseURL?: string;
}

export interface RunResult {
  actions: ActionResult[];
}

/**
 * Runtime for Otto Browser
 * @param config
 * @param actions
 */
export async function run(
  config: RunConfig,
  actions: Action[]
): Promise<RunResult | undefined> {
  const runTime = getRunTime(config.runTime);
  const browser = await runTime.launch();
  const page = await browser.newPage();

  try {
    const browserResults = await action.runAll(page, actions);
    await browser.close();

    return {
      actions: browserResults
    };
  } catch (err) {
    await browser.close();
  }
}
