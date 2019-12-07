import React from 'react'
import { string } from 'prop-types'

import Field from './Field'
import {
  withValidationAndTransition,
  commonPropTypes,
  commonDefaultProps,
} from '../hocs/withValidationAndTransition'

const InformationField = (
  { title, description, next, nextBtnText, focusRef, children, containerRef, style },
) => (
  <div>
    <input
      style={{ width: 0, height: 0, opacity: 0, margin: 0, padding: 0, border: 'none' }}
      onKeyPress={( { key } ) => ( key === 'Enter' ? next() : null )}
      ref={focusRef}
      aria-label="This is a hidden field and should be ignored."
    />
    <Field
      title={title}
      description={description}
      next={next}
      nextBtnText={nextBtnText}
      containerRef={containerRef}
      style={style}
    >
      {children || []}
    </Field>
  </div>
)

InformationField.propTypes = {
  ...commonPropTypes,
  nextBtnText: string,
}

InformationField.defaultProps = {
  ...commonDefaultProps,
}

export default withValidationAndTransition( InformationField )
