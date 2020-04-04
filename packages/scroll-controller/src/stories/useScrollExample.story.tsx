import React, { useRef, LegacyRef, MutableRefObject, forwardRef } from 'react';
import { useScroll } from '..';

export default { title: 'ScrollController/Hooks' };

export const UseScrollExample = () => {
  const containerRef = useRef<HTMLElement>() as MutableRefObject<HTMLElement>;
  const scrollSpeed = 50;
  const verticalOffset = 100;
  const { scrollToElement, scrollToY } = useScroll({ scrollSpeed, containerRef });
  const refs = [useRef<HTMLDivElement>(), useRef<HTMLDivElement>()];
  return (
    <>
      <div
        ref={containerRef as LegacyRef<HTMLDivElement>}
        style={{ height: '75vh', border: '2px solid black' }}
      >
        <button
          style={{ position: 'fixed', left: 100 }}
          onClick={() =>
            scrollToElement(refs[0] as MutableRefObject<HTMLDivElement>, verticalOffset)
          }
        >
          Scroll to second element
        </button>
        <button
          style={{ position: 'fixed', left: 250 }}
          onClick={() =>
            scrollToElement(refs[1] as MutableRefObject<HTMLDivElement>, verticalOffset)
          }
        >
          scroll to fifth element
        </button>
        <button style={{ position: 'fixed', left: 375 }} onClick={() => scrollToY(0)}>
          Go To Top
        </button>
        <Wrapper />
        <Wrapper ref={refs[0]} />
        <Wrapper />
        <Wrapper />
        <Wrapper ref={refs[1]} />
        <Wrapper />
        <Wrapper />
        <Wrapper />
      </div>
      <p>Other content here</p>
    </>
  );
};

const Wrapper = forwardRef((props, ref) => (
  <div ref={ref as MutableRefObject<HTMLDivElement>}>
    <p style={{ height: 450 }}>Some Element</p>
  </div>
));
Wrapper.displayName = 'Wrapper';
