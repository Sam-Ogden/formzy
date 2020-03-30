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
  verticalOffset?: number,
  containerRef?: React.MutableRefObject<HTMLDivElement | undefined>
) => UseScrollControllerReturnType;

const cancelAllAnimationFrames = (frames: Array<number>) => {
  frames.forEach(frame => window.cancelAnimationFrame(frame));
};
/**
 * Hook to manage scrolling between multiple elements.
 * Elements are added to the scroll order using the returned createScrollRef function.
 * @param {number} initialActive number indicating the element to scroll to after first render
 * @param {number} verticalOffset number of pixels to leave between the top of the container and element
 * @param {React.MutableRefObject<HTMLElement>} containerRef ref to the container in which to scroll.
 * If not defined then uses window. When using a containerRef, the container must have overflow: 'scroll' set on it.
 */
const useScrollController: useScrollControllerType = (
  initialActive = 0,
  verticalOffset = 0,
  containerRef
) => {
  const [length, setLength] = React.useState(0);
  let scrollRefs: Array<React.MutableRefObject<HTMLElement | undefined>> = [];
  const { next, previous, goToPosition, active } = useSequence(length, initialActive);
  const createScrollRef = () => {
    const scrollRef = React.useRef<HTMLElement>();
    scrollRefs = [...scrollRefs, scrollRef];
    return { ref: scrollRef, index: scrollRefs.length - 1 };
  };

  const animationFrames = React.useRef<Array<number>>([]);

  React.useLayoutEffect(() => {
    if (containerRef?.current) {
      const elemOffset = scrollRefs[initialActive]?.current?.offsetTop;
      containerRef.current.scrollTop = (elemOffset || 0) - verticalOffset;
    } else {
      const elemOffset = scrollRefs[initialActive]?.current?.offsetTop;
      window.scrollTo({ top: (elemOffset || 0) - verticalOffset, behavior: 'smooth' });
    }
    setLength(scrollRefs.length);
  }, []);

  React.useLayoutEffect(() => {
    if (containerRef?.current) {
      const speed = 40;
      cancelAllAnimationFrames(animationFrames.current);
      animationFrames.current.push(
        window.requestAnimationFrame(function step() {
          const elemOffset = scrollRefs[active]!.current!.offsetTop;
          const scrollTop = containerRef!.current!.scrollTop;
          const difference = elemOffset - scrollTop - verticalOffset;
          if (difference < 0) {
            if (scrollTop === 0) {
              cancelAllAnimationFrames(animationFrames.current);
              return;
            }
            const delta = Math.abs(difference) < speed ? difference : -speed;
            containerRef!.current!.scrollTop = containerRef!.current!.scrollTop + delta;
            return animationFrames.current.push(window.requestAnimationFrame(step));
          } else if (difference > 0) {
            if (
              containerRef!.current!.scrollTop + containerRef!.current!.clientHeight ===
              containerRef!.current!.scrollHeight
            ) {
              cancelAllAnimationFrames(animationFrames.current);
              return;
            }
            const delta = Math.abs(difference) < speed ? difference : speed;
            containerRef!.current!.scrollTop = containerRef!.current!.scrollTop + delta;
            return animationFrames.current.push(window.requestAnimationFrame(step));
          }
          cancelAllAnimationFrames(animationFrames.current);
        })
      );
    } else {
      const elemOffset = scrollRefs[active]?.current?.offsetTop;
      window.scrollTo({ top: (elemOffset || 0) - verticalOffset, behavior: 'smooth' });
    }
  }, [active]);

  return { createScrollRef, next, previous, goToPosition, active };
};

export { useScrollController };
