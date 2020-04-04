import { MutableRefObject, useLayoutEffect, useRef, useState } from 'react';
import { useSequence, UseSequenceReturnType, useScroll } from './';

interface UseScrollControllerReturnType extends UseSequenceReturnType {
  createScrollRef: () => {
    ref: MutableRefObject<HTMLElement | undefined>;
    index: number;
  };
}

type Props = {
  initialActive?: number;
  verticalOffset?: number;
  scrollSpeed?: number;
  containerRef?: MutableRefObject<HTMLElement>;
};

/**
 * Hook to manage scrolling between multiple elements.
 * Elements are added to the scroll order using the returned createScrollRef function.
 * @param {number} initialActive number indicating the element to scroll to after first render
 * @param {number} verticalOffset number of pixels to leave between the top of the container and element
 * @param {MutableRefObject<HTMLElement>} containerRef ref to the container in which to scroll.
 * If not defined then uses window. When using a containerRef, the container must have overflow: 'scroll' set on it.
 */
const useScrollController = (options: Props = {}): UseScrollControllerReturnType => {
  const { initialActive = 0, verticalOffset = 0, scrollSpeed = 40, containerRef } = options;

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

export { useScrollController };
