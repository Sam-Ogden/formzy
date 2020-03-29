import * as React from 'react';
import { useSequence, UseSequenceReturnType } from './';

interface UseScrollControllerReturnType extends UseSequenceReturnType {
  createScrollRef: () => {
    ref: React.MutableRefObject<HTMLElement | undefined>;
    index: number;
  };
}

type useScrollControllerType = (
  initialActive?: number,
  verticalOffset?: number
) => UseScrollControllerReturnType;

/**
 * Hook to manage scrolling between multiple elements.
 * Elements are added to the scroll order using the returned createScrollRef function.
 * @param {number} initialActive number indicating the element to scroll to after first render
 * @param {number} verticalOffset number of pixels to leave between the top of the container and element
 */
const useScrollController: useScrollControllerType = (initialActive = 0, verticalOffset = 0) => {
  const [length, setLength] = React.useState(0);
  let scrollRefs: Array<React.MutableRefObject<HTMLElement | undefined>> = [];
  const { next, previous, goToPosition, active } = useSequence(length, initialActive);

  const createScrollRef = () => {
    const scrollRef = React.useRef<HTMLElement>();
    scrollRefs = [...scrollRefs, scrollRef];
    return { ref: scrollRef, index: scrollRefs.length - 1 };
  };

  React.useLayoutEffect(() => {
    const elemOffset = scrollRefs[initialActive]?.current?.offsetTop;
    window.scrollTo({ top: (elemOffset || 0) - verticalOffset, behavior: 'smooth' });
    setLength(scrollRefs.length);
  }, []);

  React.useLayoutEffect(() => {
    const elemOffset = scrollRefs[active]?.current?.offsetTop;
    window.scrollTo({ top: (elemOffset || 0) - verticalOffset, behavior: 'smooth' });
  }, [active]);

  return { createScrollRef, next, previous, goToPosition, active };
};

export { useScrollController };
