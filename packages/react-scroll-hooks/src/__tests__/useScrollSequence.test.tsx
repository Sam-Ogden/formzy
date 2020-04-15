import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render, fireEvent } from 'test-utils';
import { useScrollSequence } from '..';

const TestComponent = ({
  initialActive = 0,
  elementHeight = 100,
  verticalOffset = 0
}: {
  initialActive?: number;
  elementHeight?: number;
  verticalOffset?: number;
}) => {
  const { createScrollRef, next, previous, active } = useScrollSequence({
    initialActive,
    verticalOffset
  });
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
  const { getByTestId } = render(<TestComponent />);
  fireEvent.click(getByTestId('next-button'));
  expect(getByTestId('elem-1').classList).toContain('active');
  expect(getByTestId('elem-0').classList).not.toContain('active');
});

test('previous() calls window.scrollTo and decrements active element', () => {
  const { getByTestId } = render(<TestComponent initialActive={1} />);
  fireEvent.click(getByTestId('previous-button'));
  expect(getByTestId('elem-0').classList).toContain('active');
  expect(getByTestId('elem-1').classList).not.toContain('active');
});

test.each(['next', 'previous', 'goToPosition', 'active', 'createScrollRef'])(
  `useScrollController returns %s`,
  property => {
    const { result } = renderHook(() => useScrollSequence());
    expect(result.current).toHaveProperty(property);
  }
);
