import * as React from 'react';
import { render } from '@testing-library/react';

const Wrapper = ({ children }: { children: React.ReactElement }) => {
  return children;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const customRender = (ui: React.ReactElement, options1?: any) =>
  render(ui, { wrapper: Wrapper, ...options1 });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
