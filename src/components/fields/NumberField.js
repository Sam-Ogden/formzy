import React from 'react'
import { number } from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Field from './Field'
import fieldStyles from './FieldStyle'
import {
  withValidationAndTransition,
  commonPropTypes,
} from '../hocs/withValidationAndTransition'

const useStyles = makeStyles( { ...fieldStyles } )

/**
 * A form field the accepts numbers only
 */
const NumberField = props => {
  const {
    name,
    title,
    focusRef,
    containerRef,
    inputChange,
    required,
    description,
    placeholder,
    min,
    max,
    next,
    err,
    className,
  } = props
  const classes = useStyles( props )
  const onChange = ( { target: { value } } ) => inputChange( value )

  return (
    <Field
      title={title}
      description={description}
      next={next}
      err={err}
      required={required}
      containerRef={containerRef}
      className={className}
      classes={classes}
    >
      <input
        placeholder={placeholder}
        type="number"
        name={name}
        onChange={onChange}
        onKeyPress={( { key } ) => ( key === 'Enter' ? next() : null )}
        ref={focusRef}
        required={required}
        min={min}
        max={max}
      />
    </Field>
  )
}

NumberField.propTypes = {
  ...commonPropTypes,
  min: number,
  max: number,
}

export default withValidationAndTransition( NumberField )
