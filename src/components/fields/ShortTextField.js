import React, { Component } from 'react'
import { number, shape, instanceOf } from 'prop-types'

import css from './Field.css'
import Field from './Field'
import { withValidationAndTransition,
  commonPropTypes,
  commonDefaultProps } from '../hocs/withValidationAndTransition'

class ShortTextField extends Component {
  onChange = ( { target: { value } } ) => {
    const { inputChange } = this.props
    inputChange( value )
  }

  render() {
    const { name,
      title,
      focusRef,
      containerRef,
      required,
      description,
      placeholder,
      maxLength,
      next,
      err,
      style } = this.props

    return (
      <Field
        title={title}
        description={description}
        next={next}
        err={err}
        required={required}
        containerRef={containerRef}
        style={style}
      >
        <input
          className={`textfield-input ${css.input}`}
          placeholder={placeholder}
          type="text"
          name={name}
          style={style.textInput}
          onChange={this.onChange}
          onKeyPress={( { key } ) => ( key === 'Enter' ? next() : null )}
          ref={focusRef}
          required={required}
          maxLength={maxLength}
        />
      </Field>
    )
  }
}

ShortTextField.propTypes = {
  ...commonPropTypes,
  maxLength: number,
  style: shape( { textInput: instanceOf( Object ) } ),
}

ShortTextField.defaultProps = {
  ...commonDefaultProps,
  maxLength: 524288,
}

export default withValidationAndTransition( ShortTextField )
