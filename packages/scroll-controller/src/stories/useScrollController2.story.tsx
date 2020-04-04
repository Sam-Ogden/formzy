import React, { MutableRefObject, useRef, LegacyRef, forwardRef } from 'react';
import { useScrollController } from '..';

export default { title: 'ScrollController/Hooks' };

export const ScrollControllerWithContainer = () => {
  const containerRef = useRef<HTMLElement>() as MutableRefObject<HTMLElement>;

  const { createScrollRef, next, previous, goToPosition, active } = useScrollController({
    initialActive: 2,
    verticalOffset: 100,
    scrollSpeed: 50,
    containerRef
  });

  return (
    <>
      <div
        ref={containerRef as LegacyRef<HTMLDivElement>}
        style={{ height: '75vh', border: '2px solid black' }}
      >
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
      <p>Other content here</p>
    </>
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
