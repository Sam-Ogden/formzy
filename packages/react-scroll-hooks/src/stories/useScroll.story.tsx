import React, { useRef, forwardRef, RefObject } from 'react';
import { number, withKnobs } from '@storybook/addon-knobs';
import { useScroll } from '..';

export default {
  title: 'react-scroll-hooks/useScroll',
  decorators: [withKnobs],
  component: useScroll
};

export const ContainerExample = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollSpeed = number('Scroll Speed', 50);
  const verticalOffset = number('Vertical Offset', 0);
  const { scrollToElement, scrollToY } = useScroll({ scrollSpeed, containerRef });
  const refs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  return (
    <>
      <button
        onClick={() => scrollToElement(refs[0], verticalOffset)}
        className="scroll-to-second-element"
      >
        Scroll to second element
      </button>
      <button
        onClick={() => scrollToElement(refs[1], verticalOffset)}
        className="scroll-to-last-element"
      >
        scroll to fifth element
      </button>
      <button onClick={() => scrollToY(0)} className="scroll-to-y0">
        Go To Top
      </button>
      <div
        ref={containerRef}
        style={{
          height: '600px',
          border: '2px solid black',
          position: 'relative',
          overflow: 'scroll'
        }}
        className="container"
      >
        <Wrapper />
        <Wrapper ref={refs[0]} />
        <Wrapper />
        <Wrapper />
        <Wrapper ref={refs[1]} />
      </div>
      <p>Other content here</p>
    </>
  );
};

const Wrapper = forwardRef((props, ref) => (
  <div ref={ref as RefObject<HTMLDivElement>} style={{ height: 500 }}>
    <p style={{ margin: 0 }}>Some Element</p>
  </div>
));
Wrapper.displayName = 'Wrapper';
