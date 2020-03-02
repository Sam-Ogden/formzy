import React from 'react'
import { number } from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Field from './Field'
import fieldStyles from './FieldStyle'
import {
  withValidationAndTransition,
  commonPropTypes,
  commonDefaultProps,
} from '../hocs/withValidationAndTransition'

const useStyles = makeStyles( { ...fieldStyles } )

const ShortTextField = props => {
  const {
    name,
    title,
    focusRef,
    containerRef,
    required,
    description,
    placeholder,
    maxLength,
    next,
    err,
    inputChange,
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
      classes={classes}
      className={className}
    >
      <input
        placeholder={placeholder}
        type="text"
        name={name}
        onChange={onChange}
        onKeyPress={( { key } ) => ( key === 'Enter' ? next() : null )}
        ref={focusRef}
        required={required}
        maxLength={maxLength}
      />
    </Field>
  )
}

ShortTextField.propTypes = {
  ...commonPropTypes,
  maxLength: number,
}

ShortTextField.defaultProps = { ...commonDefaultProps }

export default withValidationAndTransition( ShortTextField )
