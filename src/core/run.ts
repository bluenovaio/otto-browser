import * as playwright from 'playwright';
import * as _ from 'lodash';

import { Action, ActionResult, HTTPCall } from './types';
import * as httpData from './data/http';
import * as action from './action';

// ===========================
// ======== RunTime ==========
// ===========================

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

export interface RunConfig {
  runTime: RunTime;
  baseURL?: string;
}

export interface RunResult {
  actions: ActionResult[];
  requests: HTTPCall[];
}

async function buildRequests(requests: playwright.Request[]): Promise<HTTPCall[]> {
  return _.compact(
    await Promise.all(
      requests.map(
        async (request) => httpData.buildHttpCall(
          await request.response()
        )
      )
    )
  );
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

  // Intercept and record all HTTPCalls for processing
  await page.route('**', route => {
    rawRequests.push(route.request());
    return route.continue();
  });

  try {
    const browserResults = await action.runAll(page, actions);
    await browser.close();

    return {
      actions: browserResults,
      requests: await buildRequests(rawRequests)
    };
  } catch (err) {
    await browser.close();
  }
}
