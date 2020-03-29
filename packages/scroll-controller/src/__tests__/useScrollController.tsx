import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render, fireEvent } from 'test-utils';
import { useScrollController } from '../';

const TestComponent = ({
  initialActive = 0,
  elementHeight = 100,
  verticalOffset = 0
}: {
  initialActive?: number;
  elementHeight?: number;
  verticalOffset?: number;
}) => {
  const { createScrollRef, next, previous, active } = useScrollController(
    initialActive,
    verticalOffset
  );
  return (
    <>
      <button onClick={() => next()} data-testid="next-button">
        Next
      </button>
      <button onClick={() => previous()} data-testid="previous-button">
        Previous
      </button>
      {[0, 1, 2].map(i => (
        <Wrapper
          style={{ height: elementHeight }}
          data-testid={`elem-${i}`}
          active={active}
          key={i}
          {...createScrollRef()}
        />
      ))}
    </>
  );
};
interface WrapperProps extends React.HTMLProps<HTMLParagraphElement> {
  index?: number;
  active?: number;
}
const Wrapper = React.forwardRef(({ index, active, ...rest }: WrapperProps, ref) => (
  <p
    className={index === active ? 'active' : ''}
    ref={ref as React.MutableRefObject<HTMLParagraphElement>}
    {...rest}
  ></p>
));
Wrapper.displayName = '';

const noop = () => undefined;

test('first renders with initialActive element active', () => {
  window.scrollTo = noop;
  const { getByTestId } = render(<TestComponent initialActive={2} />);
  expect(getByTestId('elem-2').classList).toContain('active');
});

test('next() calls window.scrollTo and increments active element', () => {
  window.scrollTo = noop;
  const { getByTestId } = render(<TestComponent />);
  window.scrollTo = jest.fn();
  fireEvent.click(getByTestId('next-button'));
  expect(window.scrollTo).toHaveBeenCalledWith({
    top: getByTestId('elem-1').offsetTop,
    behavior: 'smooth'
  });
  expect(getByTestId('elem-1').classList).toContain('active');
  expect(getByTestId('elem-0').classList).not.toContain('active');
});

test('previous() calls window.scrollTo and decrements active element', () => {
  window.scrollTo = noop;
  const { getByTestId } = render(<TestComponent initialActive={1} />);
  window.scrollTo = jest.fn();
  fireEvent.click(getByTestId('previous-button'));
  expect(window.scrollTo).toHaveBeenCalledWith({
    top: getByTestId('elem-0').offsetTop,
    behavior: 'smooth'
  });
  expect(getByTestId('elem-0').classList).toContain('active');
  expect(getByTestId('elem-1').classList).not.toContain('active');
});

test('verticalOffset reduces the scrollHeight', () => {
  window.scrollTo = noop;
  const verticalOffset = 50;
  const { getByTestId } = render(<TestComponent verticalOffset={verticalOffset} />);
  window.scrollTo = jest.fn();
  fireEvent.click(getByTestId('next-button'));
  expect(window.scrollTo).toHaveBeenCalledWith({
    top: getByTestId('elem-1').offsetTop - verticalOffset,
    behavior: 'smooth'
  });
});

test.each(['next', 'previous', 'goToPosition', 'active', 'createScrollRef'])(
  `useScrollController returns %i`,
  property => {
    window.scrollTo = noop;
    const { result } = renderHook(() => useScrollController());
    expect(result.current).toHaveProperty(property);
  }
);
