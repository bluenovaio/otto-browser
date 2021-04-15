import * as playwright from 'playwright';

import { Element, DOMAction, DOMActionResult } from '../actionTypes';
import { execAsync } from '../../lib/safe';

async function buildElement (element: playwright.ElementHandle | null): Promise<Element | undefined> {
  if (element) {
    return {
      innerHTML: await element?.innerHTML(),
      innerText: await element?.innerText(),
      visible: await element?.isVisible(),
      hidden: await element?.isHidden(),
      checked: !!(await execAsync(async () => await element?.isChecked())),
      disabled: await element?.isDisabled(),
      enabled: await element?.isEnabled(),
      editable: await element?.isEditable()
    };
  }
}

export async function run (page: playwright.Page, action: DOMAction): Promise<DOMActionResult> {
  const element = await page.$(action.selector);

  return {
    type: 'query',
    element: await buildElement(element)
  };
}
