import * as playwright from 'playwright';

import { Action, ActionResult, AssertAction } from './types';
import * as action from './action';

// ===========================
// ======== RunTime ==========
// ===========================

export type RunTime = 'chromium' | 'webkit' | 'firefox';

function getRunTime(runTime: RunTime): playwright.BrowserType {
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

export interface RunConfig {
  runTime: RunTime;
  baseURL?: string;
}

export interface RunResult {
  actions: ActionResult[];
}

function getGroupedActions(allActions: Action[]): [AssertAction[], Action[], AssertAction[]] {
  const assertStartActions: AssertAction[] = [];
  const assertEndActions: AssertAction[] = [];
  const standardActions: Action[] = [];

  allActions.forEach((act) => {
    if (act.type === 'assertEnd') {
      assertEndActions.push(act);
    } else if (act.type === 'assertStart') {
      assertStartActions.push(act);
    } else {
      standardActions.push(act);
    }
  });

  return [assertStartActions, standardActions, assertEndActions];
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

  const rawRequests: playwright.Request[] = [];

  // Intercept and record all HTTPCalls for processing as we
  // must set this prior to any requests being made.
  await page.route('**', route => {
    rawRequests.push(route.request());
    return route.continue();
  });

  // Parse out actions so we can separate based on the core type of action.
  const [assertStartActions, standardActions, assertEndActions] = getGroupedActions(actions);

  try {
    const resultsStart = await action.runStart(page, assertStartActions);

    const results = await action.runStandard(page, standardActions);

    const resultsEnd = await action.runEnd(page, rawRequests, assertEndActions);

    await browser.close();

    return {
      actions: [
        ...resultsStart,
        ...results,
        ...resultsEnd
      ]
    };
  } catch (err) {
    await browser.close();
  }
}
