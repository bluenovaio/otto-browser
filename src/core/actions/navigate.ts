import * as playwright from 'playwright';

import { HTTPAction, HTTPActionResult, HTTPCall } from '../types';
import * as httpData from '../data/http';

export async function run (page: playwright.Page, action: HTTPAction): Promise<HTTPActionResult> {
  const response = await page.goto(action.url);
  await response?.finished();
  const httpCall = await httpData.buildHttpCall(response) as Required<HTTPCall>;

  return {
    type: 'navigate',
    id: action.id,
    ...httpCall
  };
}
