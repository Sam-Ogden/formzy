import * as React from 'react';
import { useSequence } from './useSequence';

type ScrollControllerProps = {
  name?: string;
  active?: number;
  children: React.ReactChild;
};

const ScrollController = ({ active, children }: ScrollControllerProps) => {
  const { goToPosition, active: activePosition, next, previous } = useSequence(
    React.Children.count(children),
    0
  );

  React.useEffect(() => {
    goToPosition(active);
  }, [active]);

  return (
    <div>
      {activePosition}
      <button onClick={() => next()}>Next</button>
      <button onClick={() => previous()}>Previous</button>
    </div>
  );
};

export { ScrollController };

// <Form validationScehma={}>
//   <ScrollController>
//     <Field component={CustomComponent} />
//     <TextField />
//     <TextField />
//     <TextField />
//     <TextField />
//   </ScrollController>
// </Form>;

// const Field = ({component, onNext}) => {
//   const [...] = useField();
//   return (
//     <Title />
//     <Description />
//     <Component />
//     <Button onClick={onNext}/>
//   )
// }

// const ScrollController = () => {
//   const [next, prev, goTo, active] = useSequence(children);
//   const refs = children.map(() => useRef())
//   useEffect(() => {
//     scrollTo(refs[active])
//   }, [active])
//   return (
//     children.map(Child, i => (
//       <Child onNext={next} ref={refs[i]}/>
//     ))
//   )
// }
