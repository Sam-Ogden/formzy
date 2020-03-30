import * as React from 'react';
import { useScrollController } from '..';

export default { title: 'ScrollController/Hooks' };

export const ScrollControllerWithContainer = () => {
  const containerRef = React.useRef<HTMLDivElement>();

  const { createScrollRef, next, previous, goToPosition, active } = useScrollController(
    2,
    100,
    containerRef
  );

  return (
    <>
      <div
        ref={containerRef as React.LegacyRef<HTMLDivElement>}
        style={{ overflow: 'scroll', height: '75vh', border: '2px solid black' }}
        // onScroll={async e => console.log(e)}
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
const Wrapper = React.forwardRef(({ index, active }: WrapperProps, ref) => (
  <div
    ref={ref as React.MutableRefObject<HTMLDivElement>}
    style={active === index ? { background: 'wheat' } : {}}
  >
    <p style={{ height: 450 }}>
      Test {index} <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      HEy
    </p>
  </div>
));
Wrapper.displayName = 'Wrapper';
