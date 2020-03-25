import * as React from 'react';

type TestProps = {
  name?: string;
};

const Test = ({ name }: TestProps) => <div>{name}</div>;

export { Test };
