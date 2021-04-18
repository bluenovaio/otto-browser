import * as playwright from 'playwright';

import logger from '../lib/logger';
import { Action, ActionResult, RuleEvent } from './types';
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

export interface RunConfig {
  runTime: RunTime;
  baseURL?: string;
}

export interface RunResult {
  events: RuleEvent[],
  actions: ActionResult[]
}

export async function run (config: RunConfig, actions: Action[]): Promise<unknown> {
  const runTime = getRunTime(config.runTime);
  const browser = await runTime.launch();
  const page = await browser.newPage();

  try {
    const ruleEngine = engine.create(actions);
    const browserResults = await action.runAll(page, actions);
    const ruleEngineResults = await ruleEngine.run(browserResults);

    await browser.close();
    return {
      events: ruleEngineResults.events,
      actions: browserResults
    };
  } catch (err) {
    logger.error(err.message);
    await browser.close();
  }
}
