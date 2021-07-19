import * as playwright from 'playwright';

import { DOMAction, DOMActionResult, DOMFormFieldValue } from '../types';
import { buildElement } from '../data/dom';

export async function run (page: playwright.Page, action: DOMAction): Promise<DOMActionResult> {
  const elements = await page.$$(action.selector);

  return {
    type: 'select',
    id: action.id,
    elements: await Promise.all(
      elements.map(
        async (element) => {
          await element.selectOption(action?.value as DOMFormFieldValue);
          return await buildElement(page, action, element);
        }
      )
    )
  };
}
