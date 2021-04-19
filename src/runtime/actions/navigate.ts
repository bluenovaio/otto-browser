import * as playwright from 'playwright';

import { execAsync } from '../../lib/safe';
import { HTTPAction, HTTPActionResult, HTTPResponse } from '../actionTypes';

export async function buildResponse (response: playwright.Response | null): Promise<HTTPResponse | undefined> {
  if (response) {
    const jsonBody = await execAsync(async () => await response.json());
    const body = jsonBody ?? await execAsync(async () => await response.text());
    return {
      body: body ? body.toString() : undefined,
      bodyType: jsonBody ? 'json' : 'unknown',
      headers: response.headers(),
      status: response.status(),
      statusText: response.statusText(),
      url: response.url()
    };
  }
}

export async function run (page: playwright.Page, action: HTTPAction): Promise<HTTPActionResult> {
  const response = await page.goto(action.url);
  response?.finished();

  return {
    type: 'navigate',
    id: action.id,
    response: await buildResponse(response)
  };
}
