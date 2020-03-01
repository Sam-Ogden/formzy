import React from 'react'
import PropTypes from 'prop-types'
import InformationField from './InformationField'
import { withValidationAndTransition } from '../hocs/withValidationAndTransition'

const SubmitField = props => {
  const {
    title = 'Thanks You!',
    description = 'We will be in touch shortly.',
    buttonText = 'Submit Form',
    ...rest
  } = props

  return (
    <InformationField
      title={title}
      description={description}
      buttonText={buttonText}
      {...rest}
    />
  )
}

SubmitField.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  buttonText: PropTypes.string,
}

export default withValidationAndTransition( SubmitField )
