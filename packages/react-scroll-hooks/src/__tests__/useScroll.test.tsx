import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render, fireEvent, waitFor } from 'test-utils';
import { useScroll } from '..';

const elemHeight = 1000;
const TestComponentWithContainer = ({ y = 100 }: { y?: number }) => {
  const containerRef = React.useRef<HTMLElement>() as React.MutableRefObject<HTMLElement>;
  const { scrollToElement, scrollToY } = useScroll({ containerRef });
  const ref = React.useRef<HTMLElement>();
  return (
    <div ref={containerRef as React.RefObject<HTMLDivElement>}>
      <button onClick={() => scrollToElement(ref as React.MutableRefObject<HTMLDivElement>)}>
        scrollToElement
      </button>
      <button onClick={() => scrollToY(y)}>scrollToY</button>
      <div ref={ref as React.RefObject<HTMLDivElement>}></div>
    </div>
  );
};
const TestComponent = ({ y = 100, speed = 1000 }: { y?: number; speed?: number }) => {
  const { scrollToElement, scrollToY } = useScroll({ scrollSpeed: speed });
  const ref = React.useRef<HTMLElement>();
  return (
    <>
      <button onClick={() => scrollToElement(ref as React.MutableRefObject<HTMLDivElement>)}>
        scrollToElement
      </button>
      <button onClick={() => scrollToY(y)}>scrollToY</button>
      <div ref={ref as React.RefObject<HTMLDivElement>}></div>
      <div style={{ height: elemHeight }}></div>
    </>
  );
};

describe('useScroll', () => {
  const scrollHeight = 3000;
  const clientHeight = 1000;
  beforeAll(() => {
    jest
      .spyOn(document.documentElement, 'clientHeight', 'get')
      .mockImplementation(() => clientHeight);
    jest
      .spyOn(document.documentElement, 'scrollHeight', 'get')
      .mockImplementation(() => scrollHeight);
  });

  test('useScroll returns correct initial active value', () => {
    const { result } = renderHook(() => useScroll());
    const { scrollToElement, scrollToY } = result.current;
    expect(scrollToElement).toBeDefined();
    expect(scrollToY).toBeDefined();
  });

  test('SHOULD call window.requestAnimationFrame when calling scrollToElement', () => {
    window.requestAnimationFrame = jest.fn();
    const { getByText } = render(<TestComponentWithContainer />);
    fireEvent.click(getByText('scrollToElement'));
    expect(window.requestAnimationFrame).toHaveBeenCalled();
  });

  test('SHOULD call window.cancelAnimationFrame when calling scrolling twice', () => {
    window.cancelAnimationFrame = jest.fn();
    const { getByText } = render(<TestComponentWithContainer />);
    fireEvent.click(getByText('scrollToElement'));
    fireEvent.click(getByText('scrollToY'));
    expect(window.cancelAnimationFrame).toHaveBeenCalled();
  });

  test('SHOULD scroll to down correct y position in document', async () => {
    window.requestAnimationFrame = jest.fn(cb => {
      cb(0);
      return 1;
    });
    const yPos = 100;
    const { getByText } = render(<TestComponent y={yPos} />);
    fireEvent.click(getByText('scrollToY'));
    await waitFor(() => expect(document.documentElement.scrollTop).toEqual(yPos));
  });

  test('SHOULD scroll up when below y position', async () => {
    window.requestAnimationFrame = jest.fn(cb => {
      cb(0);
      return 1;
    });
    const yPos = 0;
    document.documentElement.scrollTop = 100;
    const { getByText } = render(<TestComponent y={yPos} />);
    fireEvent.click(getByText('scrollToY'));
    await waitFor(() => expect(document.documentElement.scrollTop).toEqual(yPos));
  });

  test('SHOULD not scroll down when already at the bottom of document', async () => {
    window.requestAnimationFrame = jest.fn(cb => {
      cb(0);
      return 1;
    });
    document.documentElement.scrollTop = scrollHeight - clientHeight;
    const { getByText } = render(<TestComponent y={scrollHeight} />);
    fireEvent.click(getByText('scrollToY'));
    await waitFor(() =>
      expect(document.documentElement.scrollTop).toEqual(scrollHeight - clientHeight)
    );
  });

  test('SHOULD not try to scroll when y is negative', async () => {
    window.requestAnimationFrame = jest.fn(cb => {
      cb(0);
      return 1;
    });
    const yPos = -1;
    const { getByText } = render(<TestComponent y={yPos} />);
    fireEvent.click(getByText('scrollToY'));
    await waitFor(() => expect(document.documentElement.scrollTop).toEqual(0));
  });

  test('SHOULD allow user to cancel scrolling when scroll down is in progress', async () => {
    window.requestAnimationFrame = jest.fn(cb => {
      cb(0);
      return 1;
    });
    const yPos = 1000;
    const { getByText } = render(<TestComponent y={yPos} />);
    fireEvent.click(getByText('scrollToY'));
    document.documentElement.scrollTop = 0;
    await waitFor(() => expect(document.documentElement.scrollTop).toEqual(0));
  });

  test('SHOULD allow user to cancel scrolling when scroll up is in progress', async () => {
    window.requestAnimationFrame = jest.fn(cb => {
      cb(0);
      return 1;
    });
    const yPos = 0;
    document.documentElement.scrollTop = 500;
    const { getByText } = render(<TestComponent y={yPos} speed={10} />);
    fireEvent.click(getByText('scrollToY'));
    document.documentElement.scrollTop = 1000;
    await waitFor(() => expect(document.documentElement.scrollTop).toEqual(1000));
  });

  test('SHOULD use speed when distance is greater than the speed', async () => {
    window.requestAnimationFrame = jest.fn(cb => {
      cb(0);
      return 1;
    });
    const yPos = 100;
    const { getByText } = render(<TestComponent y={yPos} speed={50} />);
    fireEvent.click(getByText('scrollToY'));
    await waitFor(() => expect(document.documentElement.scrollTop).toEqual(100));
  });
});

/**
 * doesnt scroll up when at top of container
 * doesnt scroll down when at bottom of container
 * doesnt scroll when already at correct position
 * scrolls up when below and not at top of container
 * scrolls down when above and not at bottom of container
 */
