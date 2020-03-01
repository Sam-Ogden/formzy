import React from 'react'
import { number, shape, instanceOf } from 'prop-types'

import Field from './Field'
import {
  withValidationAndTransition,
  commonPropTypes,
  commonDefaultProps,
} from '../hocs/withValidationAndTransition'

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
    style,
    inputChange,
    className,
    classes,
  } = props

  const onChange = ( { target: { value } } ) => inputChange( value )

  return (
    <Field
      title={title}
      description={description}
      next={next}
      err={err}
      required={required}
      containerRef={containerRef}
      style={style}
      classes={classes}
      className={className}
    >
      <input
        placeholder={placeholder}
        type="text"
        name={name}
        style={style.textInput}
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
  style: shape( { textInput: instanceOf( Object ) } ),
}

ShortTextField.defaultProps = { ...commonDefaultProps }

export default withValidationAndTransition( ShortTextField )
