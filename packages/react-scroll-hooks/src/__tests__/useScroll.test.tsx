import { renderHook } from '@testing-library/react-hooks';
import { useScroll } from '..';

test('useSequence returns correct initial active value', () => {
  const { result } = renderHook(() => useScroll());
  const { scrollToElement, scrollToY } = result.current;
  expect(scrollToElement).toBeDefined();
  expect(scrollToY).toBeDefined();
});
