import { Page } from 'playwright';
import * as _ from 'lodash';

import { Action, ActionResult, Rule } from './types';
import { transformActionToRule } from './rules/engine';
import * as navigateAction from './actions/navigate';
import * as uncheckAction from './actions/uncheck';
import * as selectAction from './actions/select';
import * as queryAction from './actions/query';
import * as clickAction from './actions/click';
import * as checkAction from './actions/check';
import * as typeAction from './actions/type';
import * as engine from './rules/engine';

async function runAction(page: Page, action: Action): Promise<ActionResult> {
  switch (action.type) {
    case 'type':
      return await typeAction.run(page, action);
    case 'uncheck':
      return await uncheckAction.run(page, action);
    case 'check':
      return await checkAction.run(page, action);
    case 'select':
      return await selectAction.run(page, action);
    case 'click':
      return await clickAction.run(page, action);
    case 'query':
      return await queryAction.run(page, action);
    case 'navigate':
      return await navigateAction.run(page, action);
    default:
      throw new Error(`Action not found: ${(action as Action).type}`);
  }
}

/**
 * Run all actions
 * @param page
 * @param actions
 */
export async function runAll(
  page: Page,
  actions: Action[]
): Promise<ActionResult[]> {
  const results = [];

  // We have to run in sequence for now so
  // we can make sure "navigations" etc. happen
  // in the correct order.
  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    const actionResult = await runAction(page, action);

    // We have to run the Rules Engine here for every
    // action individually to allow for the complex &
    // flexible logic but in an isolated manner.
    // In the future we will work to optimize this
    // so we can speed up the run time of tests.
    const ruleEngine = engine.create(
      _.compact([transformActionToRule(action)]) as Rule[]
    );
    const rulesEngineResult = await ruleEngine.run({ browser: actionResult });
    const [ruleResult] = rulesEngineResult.failureEvents;
    results.push({
      ...actionResult,
      rule: ruleResult
    });
  }

  return results;
}
