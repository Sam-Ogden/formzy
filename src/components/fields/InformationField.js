import React from 'react'
import { string } from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Field from './Field'
import fieldStyles from './FieldStyle'
import {
  withValidationAndTransition,
  commonPropTypes,
  commonDefaultProps,
} from '../hocs/withValidationAndTransition'

const useStyles = makeStyles( { ...fieldStyles } )

const InformationField = props => {
  const {
    title,
    description,
    className,
    next,
    nextButtonText,
    focusRef,
    children,
    containerRef,
  } = props

  const classes = useStyles( props )

  return (
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
        nextButtonText={nextButtonText}
        containerRef={containerRef}
        classes={classes}
        className={className}
      >
        {children || []}
      </Field>
    </div>
  )
}
InformationField.propTypes = {
  ...commonPropTypes,
  nextButtonText: string,
}

InformationField.defaultProps = { ...commonDefaultProps }

export default withValidationAndTransition( InformationField )
