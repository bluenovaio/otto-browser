import { Page } from 'playwright';

import * as navigateAction from './actions/navigate';
import * as queryAction from './actions/query';
import * as clickAction from './actions/click';
import { Action } from './actionTypes';

function runAction (page: Page, action: Action) {
  switch (action.type) {
    case 'click':
      return clickAction.run(page, action);
    case 'query':
      return queryAction.run(page, action);
    case 'navigate':
      return navigateAction.run(page, action);
    default:
      throw new Error(`Action not found: ${(action as Action).type}`);
  }
}

export async function runAll (page: Page, actions: Action[]): Promise<unknown[]> {
  const results = [];

  // We have to run in sequence for now so
  // we can make sure "navigations" etc. happen
  // in the correct order.
  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    results.push(
      await runAction(page, action)
    );
  }

  return results;
}
