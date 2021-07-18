import * as playwright from 'playwright';

import { DOMAction, DOMElement } from '../types';

async function getProperty (element: playwright.ElementHandle, propertyName: string) {
  const result = await element?.getProperty(propertyName);
  return result.jsonValue();
}

async function getClassNames (element: playwright.ElementHandle) {
  const className = await getProperty(element, 'className');
  return className ? className.split(' ') : [];
}

export async function buildElement (page: playwright.Page, action: DOMAction, element: playwright.ElementHandle): Promise<DOMElement> {
  let isChecked = false;

  try {
    isChecked = await element?.isChecked();
  } catch (err) {}

  return {
    classNames: await getClassNames(element),
    id: await getProperty(element, 'id'),
    tagName: (await getProperty(element, 'tagName')).toLowerCase(),
    innerHTML: await element?.innerHTML(),
    innerText: await element?.innerText(),
    visible: await element?.isVisible(),
    hidden: await element?.isHidden(),
    checked: isChecked,
    disabled: await element?.isDisabled(),
    enabled: await element?.isEnabled(),
    editable: await element?.isEditable()
  };
}
