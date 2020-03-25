import { render } from '@testing-library/react';

const Wrapper = ({ children }) => {
  return children;
};

const customRender = (ui, options?) => render(ui, { wrapper: Wrapper, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
