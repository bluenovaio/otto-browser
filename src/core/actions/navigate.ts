import * as playwright from 'playwright';

import { HTTPAction, HTTPActionResult } from '../types';
import { buildResponse } from '../data/http';

export async function run (page: playwright.Page, action: HTTPAction): Promise<HTTPActionResult> {
  const response = await page.goto(action.url);
  response?.finished();

  return {
    type: 'navigate',
    id: action.id,
    response: await buildResponse(response)
  };
}
