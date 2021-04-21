import * as playwright from 'playwright';
import * as _ from 'lodash';

import logger from '../lib/logger';
import { Action, ActionResult, RuleEvent } from './actionTypes';
import * as engine from './rules/engine';
import * as action from './action';

export type RunTime = 'chromium'
  | 'webkit'
  | 'firefox';

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

// ===========================
// ======== RunTime ==========
// ===========================

export interface RunConfig {
  runTime: RunTime;
  baseURL?: string;
}

export interface RunResult {
  events: RuleEvent[],
  actions: ActionResult[]
}

/**
 * Runtime for Otto Browser
 * @param config
 * @param actions
 */
export async function run (config: RunConfig, actions: Action[]): Promise<RunResult | undefined> {
  const runTime = getRunTime(config.runTime);
  const browser = await runTime.launch();
  const page = await browser.newPage();

  try {
    const ruleEngine = engine.create(actions);
    const browserResults = await action.runAll(page, actions);

    const ruleEngineResults = await Promise.all(browserResults.map((browser) => {
      return ruleEngine.run({ browser });
    }));
    const parsedResults = _.flatMap(ruleEngineResults, (result) => result.failureEvents);

    await browser.close();

    return {
      events: parsedResults as RuleEvent[],
      actions: browserResults
    };
  } catch (err) {
    logger.error(err);
    await browser.close();
  }
}
