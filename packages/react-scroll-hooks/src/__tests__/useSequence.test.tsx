import { renderHook, act } from '@testing-library/react-hooks';
import { useSequence } from '../useSequence';

test('useSequence returns correct initial active value', () => {
  const initialActivePosition = 1;
  const { result } = renderHook(() => useSequence(5, initialActivePosition));
  const { active } = result.current;
  expect(active).toEqual(initialActivePosition);
});

test('next method increments active position', () => {
  const initialActivePosition = 0;
  const { result } = renderHook(() => useSequence(5, initialActivePosition));
  act(() => result.current.next());
  expect(result.current.active).toEqual(initialActivePosition + 1);
});

test('next method doesnt increment active position when at the end of the sequence', () => {
  const initialActivePosition = 0;
  const { result } = renderHook(() => useSequence(1));
  act(() => result.current.next());
  expect(result.current.active).toEqual(initialActivePosition);
});

test('previous method decrements active position', () => {
  const initialActivePosition = 1;
  const { result } = renderHook(() => useSequence(5, initialActivePosition));
  act(() => result.current.previous());
  expect(result.current.active).toEqual(initialActivePosition - 1);
});

test('previous method doesnt decrement active position when at the beginning of the sequence', () => {
  const initialActivePosition = 0;
  const { result } = renderHook(() => useSequence(1, initialActivePosition));
  act(() => result.current.previous());
  expect(result.current.active).toEqual(initialActivePosition);
});

test('goToPosition method updates the active position', () => {
  const initialActivePosition = 0;
  const targetPosition = 4;
  const { result } = renderHook(() => useSequence(5, initialActivePosition));
  act(() => result.current.goToPosition(targetPosition));
  expect(result.current.active).toEqual(targetPosition);
});

test("goToPosition method doesn't update the active position when the position is beyond the end of the sequence", () => {
  const initialActivePosition = 0;
  const targetPosition = 5;
  const { result } = renderHook(() => useSequence(5, initialActivePosition));
  act(() => result.current.goToPosition(targetPosition));
  expect(result.current.active).toEqual(initialActivePosition);
});

test("goToPosition method doesn't update the active position when the position is less than 0", () => {
  const initialActivePosition = 2;
  const targetPosition = -1;
  const { result } = renderHook(() => useSequence(5, initialActivePosition));
  act(() => result.current.goToPosition(targetPosition));
  expect(result.current.active).toEqual(initialActivePosition);
});
