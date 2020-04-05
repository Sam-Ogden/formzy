import React, { forwardRef, MutableRefObject } from 'react';
import { useScrollController } from '..';
export default { title: 'ScrollController/Hooks' };

export const ScrollControllerExample = () => {
  const { createScrollRef, next, previous, goToPosition, active } = useScrollController({
    initialActive: 3,
    verticalOffset: 100,
    scrollSpeed: 30
  });

  return (
    <div>
      <button
        style={{ position: 'fixed', left: 100 }}
        onClick={() => {
          console.log('click');
          next();
        }}
      >
        Next
      </button>
      <button style={{ position: 'fixed', left: 150 }} onClick={() => previous()}>
        Prev
      </button>
      <button style={{ position: 'fixed', left: 200 }} onClick={() => goToPosition(10)}>
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
      <Wrapper {...createScrollRef()} active={active} />
      <Wrapper {...createScrollRef()} active={active} />
      <Wrapper {...createScrollRef()} active={active} />
      <Wrapper {...createScrollRef()} active={active} />
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
const Wrapper = forwardRef(({ index, active }: WrapperProps, ref) => (
  <div
    ref={ref as MutableRefObject<HTMLDivElement>}
    style={active === index ? { background: 'wheat' } : {}}
  >
    <p style={{ height: 450 }}>Test {index}</p>
  </div>
));
Wrapper.displayName = 'Wrapper';
