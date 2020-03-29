import * as React from 'react';
import { useScrollController } from '..';

export default { title: 'ScrollController/Hooks' };

export const ScrollControllerExample = () => {
  const { createScrollRef, next, previous, goToPosition, active } = useScrollController(3, 100);

  return (
    <div>
      <button style={{ position: 'fixed', left: 100 }} onClick={() => next()}>
        Next
      </button>
      <button style={{ position: 'fixed', left: 150 }} onClick={() => previous()}>
        Prev
      </button>
      <button style={{ position: 'fixed', left: 200 }} onClick={() => goToPosition(5)}>
        Go To Position 5
      </button>
      <Wrapper {...createScrollRef()} active={active} />
      <Wrapper {...createScrollRef()} active={active} />
      <Wrapper {...createScrollRef()} active={active} />
      <Wrapper {...createScrollRef()} active={active} />
      <Wrapper {...createScrollRef()} active={active} />
      <Wrapper {...createScrollRef()} active={active} />
      <Wrapper {...createScrollRef()} active={active} />
      <Wrapper {...createScrollRef()} active={active} />
    </div>
  );
};

type WrapperProps = {
  index?: number;
  active?: number;
};
const Wrapper = React.forwardRef(({ index, active }: WrapperProps, ref) => (
  <div
    ref={ref as React.MutableRefObject<HTMLDivElement>}
    style={active === index ? { background: 'red' } : {}}
  >
    <p style={{ height: 450 }}>Test {index}</p>
  </div>
));
Wrapper.displayName = 'Wrapper';
