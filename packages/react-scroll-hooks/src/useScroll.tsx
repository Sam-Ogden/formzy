import { useEffect, MutableRefObject, useRef, useState, useLayoutEffect } from 'react';
import warning from 'warning';

const cancelAllAnimationFrames = (frames: Array<number>) => {
  frames.forEach(frame => window.cancelAnimationFrame(frame));
};

const getScrollTop = (ref: MutableRefObject<HTMLElement>) => ref.current.scrollTop;
const getScrollHeight = (ref: MutableRefObject<HTMLElement>) => ref.current.scrollHeight;
const getClientHeight = (ref: MutableRefObject<HTMLElement>) => ref.current.clientHeight;

const atBottomOfContainer = (containerRef: MutableRefObject<HTMLElement>) =>
  getScrollTop(containerRef) + getClientHeight(containerRef) === getScrollHeight(containerRef);

export const useScroll = (
  options: {
    scrollSpeed?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    containerRef?: MutableRefObject<any>;
  } = {}
) => {
  const { scrollSpeed = 40, containerRef = { current: document.documentElement } } = options;
  const animationFrames = useRef<Array<number>>([]);
  const lastScrollPosition = useRef<number>(0);
  const isScrollingUp = useRef(false);
  const isScrollingDown = useRef(false);

  const [y, setY] = useState(-1);

  const cancelScrolling = () => {
    cancelAllAnimationFrames(animationFrames.current);
    animationFrames.current = [];
    isScrollingUp.current = false;
    isScrollingDown.current = false;
  };

  const userDidScrollInOppositeDirection = () => {
    if (isScrollingUp.current && getScrollTop(containerRef) > lastScrollPosition.current) {
      return true;
    } else if (isScrollingDown.current && getScrollTop(containerRef) < lastScrollPosition.current) {
      return true;
    }
    return false;
  };

  const performScroll = (y: number) => {
    cancelScrolling();
    lastScrollPosition.current = getScrollTop(containerRef);
    animationFrames.current.push(
      window.requestAnimationFrame(function step() {
        const scrollTop = getScrollTop(containerRef);
        const difference = y - scrollTop;
        if (Math.abs(difference) < 1) {
          cancelScrolling();
          return;
        } else if (difference < 0) {
          isScrollingUp.current = true;
          const delta = Math.abs(difference) < scrollSpeed ? difference : -scrollSpeed;
          containerRef.current.scrollTop = getScrollTop(containerRef) + delta;
          return animationFrames.current.push(window.requestAnimationFrame(step));
        } else if (difference > 0) {
          if (atBottomOfContainer(containerRef)) {
            cancelScrolling();
            return;
          }
          isScrollingDown.current = true;
          const delta = Math.abs(difference) < scrollSpeed ? difference : scrollSpeed;
          containerRef.current.scrollTop = getScrollTop(containerRef) + delta;
          return animationFrames.current.push(window.requestAnimationFrame(step));
        }
      })
    );
  };

  useEffect(() => {
    const isScrollingDocument = containerRef.current === document.documentElement;
    if (process.env.NODE_ENV !== 'production') {
      warning(
        containerRef.current.style.position || isScrollingDocument,
        'Scrolling may behave unexpectedly if the containerRef does not have a css position set on it.'
      );
      warning(
        containerRef.current.style.overflow === 'scroll' || isScrollingDocument,
        'Expected containerRef to have css property overflow set to `scroll`. Without this property scrolling may not work.'
      );
    }
  }, []);

  useEffect(() => {
    containerRef.current.addEventListener('scroll', () => {
      if (userDidScrollInOppositeDirection()) cancelScrolling();
      lastScrollPosition.current = getScrollTop(containerRef);
      setY(-1);
    });
  }, []);

  useLayoutEffect(() => {
    if (y >= 0) {
      performScroll(y);
    }
  }, [y]);

  const scrollToY = (y: number) => setY(y < 0 ? 0 : y);
  const scrollToElement = (element: React.RefObject<HTMLElement>, verticalOffset = 0) => {
    const elementOffsetTop = element?.current?.offsetTop || 0;
    scrollToY(elementOffsetTop - verticalOffset);
  };

  return { scrollToY, scrollToElement };
};
