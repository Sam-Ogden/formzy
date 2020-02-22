import React from 'react'

import InformationField from './InformationField'
import {
  withValidationAndTransition,
  commonPropTypes,
  commonDefaultProps,
} from '../hocs/withValidationAndTransition'

const SubmitField = props => (
  <InformationField {...props} />
)

SubmitField.propTypes = { ...commonPropTypes }

SubmitField.defaultProps = {
  ...commonDefaultProps,
  title: 'Thank You!',
  description: 'We will be in touch shortly.',
  buttonText: 'Submit Form',
}

export default withValidationAndTransition( SubmitField )
