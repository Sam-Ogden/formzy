import { useEffect, MutableRefObject, useRef, useState, useLayoutEffect } from 'react';

const cancelAllAnimationFrames = (frames: Array<number>) => {
  frames.forEach(frame => window.cancelAnimationFrame(frame));
};

const getScrollTop = (ref: MutableRefObject<HTMLElement>) => ref.current.scrollTop;
const getScrollHeight = (ref: MutableRefObject<HTMLElement>) => ref.current.scrollHeight;
const getClientHeight = (ref: MutableRefObject<HTMLElement>) => ref.current.clientHeight;

const atTopOfContainer = (containerRef: MutableRefObject<HTMLElement>) =>
  getScrollTop(containerRef) === 0;
const atBottomOfContainer = (containerRef: MutableRefObject<HTMLElement>) =>
  getScrollTop(containerRef) + getClientHeight(containerRef) === getScrollHeight(containerRef);

export const useScroll = (
  options: {
    scrollSpeed?: number;
    containerRef?: MutableRefObject<HTMLElement>;
  } = {}
) => {
  const { scrollSpeed = 40, containerRef = { current: document.documentElement } } = options;
  const animationFrames = useRef<Array<number>>([]);
  const [y, setY] = useState(-1);

  useEffect(() => {
    containerRef.current.style.overflow = 'scroll';
  }, []);

  const performScroll = (y: number) => {
    cancelAllAnimationFrames(animationFrames.current);
    animationFrames.current.push(
      window.requestAnimationFrame(function step() {
        const scrollTop = getScrollTop(containerRef);
        const difference = y - scrollTop;
        if (Math.abs(difference) < 1) {
          cancelAllAnimationFrames(animationFrames.current);
          animationFrames.current = [];
          return;
        } else if (difference < 0) {
          if (atTopOfContainer(containerRef)) {
            cancelAllAnimationFrames(animationFrames.current);
            animationFrames.current = [];
            return;
          }
          const delta = Math.abs(difference) < scrollSpeed ? difference : -scrollSpeed;
          containerRef.current.scrollTop = getScrollTop(containerRef) + delta;
          return animationFrames.current.push(window.requestAnimationFrame(step));
        } else if (difference > 0) {
          if (atBottomOfContainer(containerRef)) {
            cancelAllAnimationFrames(animationFrames.current);
            animationFrames.current = [];
            return;
          }
          const delta = Math.abs(difference) < scrollSpeed ? difference : scrollSpeed;
          containerRef.current.scrollTop = getScrollTop(containerRef) + delta;
          return animationFrames.current.push(window.requestAnimationFrame(step));
        }
      })
    );
  };

  const scrollToY = (y: number) => setY(y < 0 ? 0 : y);

  useLayoutEffect(() => {
    if (y >= 0) {
      performScroll(y);
    }
  }, [y]);

  const scrollToElement = (element: MutableRefObject<HTMLElement>, verticalOffset = 0) => {
    const elementOffsetTop = element.current.offsetTop;
    scrollToY(elementOffsetTop - verticalOffset);
  };

  return { scrollToY, scrollToElement };
};
