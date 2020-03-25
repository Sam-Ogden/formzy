import * as React from 'react';
import { render } from 'test-utils';

import { Test } from '../Test';

test('Example test', () => {
  const testString = 'test';
  const { queryByText } = render(<Test name={testString} />);
  expect(queryByText(testString)).toBeDefined();
});
