import React, { Fragment } from 'react'
import { string } from 'prop-types'

import Field from './Field'
import {
  withValidationAndTransition,
  commonPropTypes,
  commonDefaultProps,
} from '../hocs/withValidationAndTransition'

const InformationField = ( { title, description, next, nextBtnText, refProp, children } ) => (
  <Fragment>
    <input
      style={{ width: 0, height: 0, opacity: 0, margin: 0, padding: 0 }}
      onKeyPress={( { key } ) => ( key === 'Enter' ? next() : null )}
      ref={refProp}
      aria-label="This is a hidden field and should be ignored."
    />
    <Field title={title} description={description} next={next} nextBtnText={nextBtnText}>
      {children || []}
    </Field>
  </Fragment>
)

InformationField.propTypes = {
  ...commonPropTypes,
  nextBtnText: string,
}

InformationField.defaultProps = {
  ...commonDefaultProps,
}

export default withValidationAndTransition( InformationField )
