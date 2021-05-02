import * as playwright from 'playwright';

import { DOMAction, DOMActionResult } from '../actionTypes';
import { buildElement } from '../data/dom';

export async function run(page: playwright.Page, action: DOMAction): Promise<DOMActionResult> {
  const elements = await page.$$(action.selector);

  return {
    type: 'query',
    id: action.id,
    elements: await Promise.all(
      elements.map(
        async (element) => {
          await element.type(action?.value as string);
          return await buildElement(page, action, element);
        }
      )
    )
  };
}
