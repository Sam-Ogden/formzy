import { MutableRefObject, useLayoutEffect, useRef, useState } from 'react';
import { useSequence, useScroll } from '.';

type Props = {
  initialActive?: number;
  verticalOffset?: number;
  scrollSpeed?: number;
  containerRef?: MutableRefObject<HTMLElement>;
};

const useScrollSequence = (options: Props = {}) => {
  const { initialActive = -1, verticalOffset = 0, scrollSpeed = 40, containerRef } = options;

  const [length, setLength] = useState(0);
  const { scrollToElement } = useScroll({ scrollSpeed, containerRef: containerRef || undefined });
  const { next, previous, goToPosition, active } = useSequence(length, initialActive);

  let scrollRefs: Array<MutableRefObject<HTMLElement | undefined>> = [];
  const createScrollRef = () => {
    const scrollRef = useRef<HTMLElement>();
    scrollRefs = [...scrollRefs, scrollRef];
    return { ref: scrollRef, index: scrollRefs.length - 1 };
  };

  useLayoutEffect(() => {
    if (scrollRefs[initialActive])
      scrollToElement(scrollRefs[initialActive] as MutableRefObject<HTMLElement>, verticalOffset);
    setLength(scrollRefs.length);
  }, []);

  useLayoutEffect(() => {
    if (scrollRefs[active])
      scrollToElement(scrollRefs[active] as MutableRefObject<HTMLElement>, verticalOffset);
  }, [active]);

  return { createScrollRef, next, previous, goToPosition, active };
};

export { useScrollSequence };
