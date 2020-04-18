import { MutableRefObject, useLayoutEffect, useRef, useState, RefObject } from 'react';
import { useSequence, useScroll } from '.';

type Props = {
  initialActive?: number;
  verticalOffset?: number;
  scrollSpeed?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  containerRef?: MutableRefObject<any>;
};

const useScrollSequence = (options: Props = {}) => {
  const { initialActive = -1, verticalOffset = 0, scrollSpeed = 40, containerRef } = options;

  const [length, setLength] = useState(0);
  const { scrollToElement } = useScroll({ scrollSpeed, containerRef });
  const { next, previous, goToPosition, active } = useSequence(length, initialActive);

  let scrollRefs = useRef<Array<RefObject<HTMLElement>>>([]);

  const createScrollRef = () => {
    const scrollRef = useRef<HTMLElement>(null);
    scrollRefs = { current: [...scrollRefs.current, scrollRef] };
    return { ref: scrollRef, index: scrollRefs.current.length - 1 };
  };

  useLayoutEffect(() => {
    if (scrollRefs.current[initialActive])
      scrollToElement(scrollRefs.current[initialActive], verticalOffset);
    setLength(scrollRefs.current.length);
  }, []);

  useLayoutEffect(() => {
    if (scrollRefs.current[active]) scrollToElement(scrollRefs.current[active], verticalOffset);
  }, [active]);

  return { createScrollRef, next, previous, goToPosition, active };
};

export { useScrollSequence };
