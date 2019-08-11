import React, { Fragment } from 'react'

import Field from './Field'
import { withValidationAndTransition,
  commonPropTypes,
  commonDefaultProps } from '../hocs/withValidationAndTransition'

const SubmitField = (
  { title, description, nextBtnText, next, inputRef, containerRef, style },
) => (
  <Fragment>
    <input
      style={{ width: 0, height: 0, opacity: 0, margin: 0, padding: 0, border: 'none' }}
      onKeyPress={( { key } ) => ( key === 'Enter' ? next() : null )}
      ref={inputRef}
      aria-label="This is a hidden field and should be ignored."
    />
    <Field
      title={title}
      description={description}
      containerRef={containerRef}
      next={next}
      nextBtnText={nextBtnText}
      style={style}
    />
  </Fragment>
)

SubmitField.propTypes = {
  ...commonPropTypes,
}

SubmitField.defaultProps = {
  ...commonDefaultProps,
  title: 'Thank You!',
  description: 'We will be in touch shortly.',
  buttonText: 'Submit Form',
}

export default withValidationAndTransition( SubmitField )
