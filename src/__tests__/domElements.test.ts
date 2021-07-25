import { v4 as uuid } from 'uuid';

import * as ottoBrowser from '../main';

const URL_TEST_SITE = 'http://localhost:3881';

// Test Cases
// -----
// Loops through each test case to automatically built a test and run the test
// to add a new test follow the below directions
//
//   1. Add the "type" must be one of the support ActionTypes
//   2. Find or add in the element/feature to the test site `/testing/site/*`
//   3. Add in the selector field for the element you added or found.
//   4. Add in the elements output (this can be multiple if there are multiple on the page)
//   5. Add in the action
//
// Current Limitations
// - You can only run one action per test case
// - We must update ALL test cases if the base element is changed (i.e. add/remove field)
// - Only support DOMElement type

function createElementData(element?: ottoBrowser.DOMElement) {
  return Object.assign(
    {
      checked: false,
      classNames: [],
      disabled: false,
      editable: false,
      enabled: true,
      hidden: false,
      id: '',
      innerHTML: '',
      innerText: '',
      tagName: 'input',
      visible: true
    },
    element,
    {}
  );
}

[

  /** @file core/actions/check.ts */
  {
    name: 'check',
    selector: 'input[type="checkbox"]',
    elements: [
      createElementData({
        tagName: 'input',
        id: 'yes',
        editable: true,
        checked: true
      })
    ],
    action: {
      id: uuid(),
      type: 'check',
      selector: 'input[type="checkbox"]'
    }
  },

  /** @file core/actions/uncheck.ts */
  {
    name: 'uncheck',
    selector: 'input[type="checkbox"]',
    elements: [
      createElementData({
        tagName: 'input',
        id: 'yes',
        editable: true,
        checked: false
      })
    ],
    action: {
      id: uuid(),
      type: 'uncheck',
      selector: 'input[type="checkbox"]'
    }
  },

  /** @file core/actions/click.ts */
  {
    name: 'click',
    selector: 'button',
    elements: [
      createElementData({
        tagName: 'button',
        classNames: [
          'bg-blue-500',
          'hover:bg-blue-700',
          'text-white',
          'font-bold',
          'py-2',
          'px-4',
          'rounded',
          'focus:outline-none',
          'focus:shadow-outline'
        ],
        editable: true,
        innerHTML: expect.any(String),
        innerText: expect.any(String)
      })
    ],
    action: {
      id: uuid(),
      type: 'click',
      selector: 'button'
    }
  },

  /** @file core/actions/query.ts */
  {
    name: 'query',
    selector: 'button',
    elements: [
      createElementData({
        tagName: 'button',
        classNames: [
          'bg-blue-500',
          'hover:bg-blue-700',
          'text-white',
          'font-bold',
          'py-2',
          'px-4',
          'rounded',
          'focus:outline-none',
          'focus:shadow-outline'
        ],
        editable: true,
        innerHTML: expect.any(String),
        innerText: expect.any(String)
      })
    ],
    action: {
      id: uuid(),
      type: 'query',
      selector: 'button'
    }
  },

  /** @file core/actions/type.ts */
  {
    name: 'type',
    selector: '#name',
    elements: [
      createElementData({
        tagName: 'input',
        classNames: [
          'shadow',
          'appearance-none',
          'border',
          'rounded',
          'w-full',
          'py-2',
          'px-3',
          'text-gray-700',
          'leading-tight',
          'focus:outline-none',
          'focus:shadow-outline'
        ],
        editable: true,
        id: 'name',
        innerHTML: expect.any(String),
        innerText: expect.any(String)
      })
    ],
    action: {
      id: uuid(),
      type: 'type',
      value: 'hello world',
      selector: '#name'
    }
  },

  /** @file core/actions/select.ts */
  {
    name: 'select',
    selector: 'select',
    elements: [
      createElementData({
        tagName: 'select',
        classNames: [
          'block',
          'appearance-none',
          'w-full',
          'bg-white',
          'border',
          'border-gray-400',
          'hover:border-gray-500',
          'px-4',
          'py-2',
          'pr-8',
          'rounded',
          'shadow',
          'leading-tight',
          'focus:outline-none',
          'focus:shadow-outline'
        ],
        editable: true,
        id: 'size',
        innerHTML: expect.any(String),
        innerText: expect.any(String)
      })
    ],
    action: {
      id: uuid(),
      type: 'select',
      value: [],
      selector: 'select'
    }
  }

].forEach(testCase => {
  describe(`${testCase.name}`, () => {
    let result: ottoBrowser.RunResult;
    let action: ottoBrowser.DOMActionResult;

    beforeAll(async () => {
      // We have to navigate to the page to be able
      // to run any type of element tests
      result = (await ottoBrowser.run(
        {
          runTime: 'chromium'
        },
        [
          {
            id: uuid(),
            type: 'navigate',
            url: URL_TEST_SITE
          },
          testCase.action as ottoBrowser.DOMAction
        ]
      )) as ottoBrowser.RunResult;

      action = result?.actions[1] as ottoBrowser.DOMActionResult;
    });

    it(`builds element(s)`, () => {
      expect(action?.elements).toEqual(testCase.elements);
    });

    it(`contains valid UUID`, () => {
      expect(action?.id).toEqual(testCase.action.id);
    });

    it(`contains valid type`, () => {
      expect(action?.type).toEqual(testCase.action.type);
    });
  });
});
