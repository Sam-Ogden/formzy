import * as React from 'react';

type useSequenceType = (
  length: number,
  activeIndex?: number
) => {
  next: () => void;
  previous: () => void;
  goToPosition: (position: number) => void;
  active: number;
};

const useSequence: useSequenceType = (length, activeIndex = 0) => {
  const [active, setActive] = React.useState(activeIndex);

  const next = () =>
    setActive(currentActive => (currentActive === length - 1 ? currentActive : currentActive + 1));
  const previous = () =>
    setActive(currentActive => (currentActive === 0 ? currentActive : currentActive - 1));
  const goToPosition = position =>
    setActive(currentPosition => (position >= 0 && position < length ? position : currentPosition));

  return { next, previous, goToPosition, active };
};

export { useSequence };
