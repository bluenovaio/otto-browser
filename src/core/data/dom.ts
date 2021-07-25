import * as playwright from 'playwright';

import * as safe from '../../lib/safe';
import { DOMAction, DOMElement } from '../types';

async function getProperty(element: playwright.ElementHandle, propertyName: string) {
  const result = await element.getProperty(propertyName);
  return result.jsonValue();
}

async function getClassNames(element: playwright.ElementHandle) {
  const className = await getProperty(element, 'className');
  return className ? className.split(' ') : [];
}

export async function buildElement(page: playwright.Page, action: DOMAction, element: playwright.ElementHandle): Promise<DOMElement> {
  // We have to wrap in functions to prevent losing context (Error: "Cannot read property '_wrapApiCall' of undefined")
  const [, classNames] = await safe.execAsync(() => getClassNames(element));
  const [, tagName] = await safe.execAsync(() => getProperty(element, 'tagName'));
  const [, id] = await safe.execAsync(() => getProperty(element, 'id'));
  const [, isChecked] = await safe.execAsync(() => element.isChecked());
  const [, isVisible] = await safe.execAsync(() => element.isVisible());
  const [, isHidden] = await safe.execAsync(() => element.isHidden());
  const [, isDisabled] = await safe.execAsync(() => element.isDisabled());
  const [, isEnabled] = await safe.execAsync(() => element.isEnabled());
  const [, isEditable] = await safe.execAsync(() => element.isEditable());
  const [, innerHTML] = await safe.execAsync(() => element.innerHTML());
  const [, innerText] = await safe.execAsync(() => element.innerText());

  return {
    classNames: classNames || [],
    id: id || '',
    tagName: tagName?.toLowerCase() || '',
    innerHTML: innerHTML || '',
    innerText: innerText || '',
    visible: isVisible || false,
    hidden: isHidden || false,
    checked: isChecked || false,
    disabled: isDisabled || false,
    enabled: isEnabled || false,
    editable: isEditable || false
  };
}
