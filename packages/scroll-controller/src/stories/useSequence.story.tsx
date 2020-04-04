import React from 'react';
import { useSequence } from '..';

export default { title: 'ScrollController/Hooks' };

export const useSequenceExample = () => {
  const { goToPosition, active: activePosition, next, previous } = useSequence(10, 0);

  return (
    <div>
      <p>Sequence length: 10</p>
      <p>Active Position: {activePosition}</p>
      <button onClick={() => next()}>Next</button>
      <button onClick={() => previous()}>Previous</button>
      <button onClick={() => goToPosition(5)}>Go To Position 5</button>
    </div>
  );
};
