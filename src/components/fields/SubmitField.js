import React from 'react'
import PropTypes from 'prop-types'
import InformationField from './InformationField'
import { withValidationAndTransition } from '../hocs/withValidationAndTransition'

const SubmitField = props => {
  const {
    title = 'Thanks You!',
    description = 'We will be in touch shortly.',
    nextButtonText = 'Submit Form',
    ...rest
  } = props

  return (
    <InformationField
      title={title}
      description={description}
      nextButtonText={nextButtonText}
      {...rest}
    />
  )
}

SubmitField.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  nextButtonText: PropTypes.string,
}

export default withValidationAndTransition( SubmitField )
