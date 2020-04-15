import { useState } from 'react';

export interface UseSequenceReturnType {
  next: () => void;
  previous: () => void;
  goToPosition: (position: number) => void;
  active: number;
}

type useSequenceType = (length: number, activeIndex?: number) => UseSequenceReturnType;

const useSequence: useSequenceType = (length, activeIndex = 0) => {
  const [active, setActive] = useState(activeIndex);

  const next = () =>
    setActive(currentActive => (currentActive === length - 1 ? currentActive : currentActive + 1));
  const previous = () =>
    setActive(currentActive => (currentActive === 0 ? currentActive : currentActive - 1));
  const goToPosition = (position: number) =>
    setActive(currentPosition => (position >= 0 && position < length ? position : currentPosition));

  return { next, previous, goToPosition, active };
};

export { useSequence };
