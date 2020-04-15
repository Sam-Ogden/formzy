import React, { forwardRef, MutableRefObject } from 'react';
import { useScrollSequence } from '..';
import { number, withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'react-scroll-hooks/useScrollSequence/FullPageScroll',
  decorators: [withKnobs]
};

export const FullPageScrolling = () => {
  const { createScrollRef, next, previous, goToPosition, active } = useScrollSequence({
    initialActive: 1,
    verticalOffset: number('Vertical Offset', 0),
    scrollSpeed: number('Scroll Speed', 30)
  });

  return (
    <>
      <button style={{ position: 'fixed', left: 100 }} onClick={() => next()}>
        Next
      </button>
      <button style={{ position: 'fixed', left: 150 }} onClick={() => previous()}>
        Prev
      </button>
      <button style={{ position: 'fixed', left: 200 }} onClick={() => goToPosition(2)}>
        Go To Position 2
      </button>
      <Wrapper {...createScrollRef()} active={active} />
      <Wrapper {...createScrollRef()} active={active} />
      <Wrapper {...createScrollRef()} active={active} />
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
