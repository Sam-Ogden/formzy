import React, { Component } from 'react'
import { number } from 'prop-types'

import css from './Field.css'
import Field from './Field'
import { withValidationAndTransition,
  commonPropTypes,
  commonDefaultProps } from '../hocs/withValidationAndTransition'

/**
 * Text Field
 *
 * Custom styling
 * - textInput: style the text input field
 */
class ShortTextField extends Component {
  static propTypes = {
    ...commonPropTypes,
    maxLength: number,
  }

  static defaultProps = {
    ...commonDefaultProps,
    maxLength: 524288,
  }

  onChange = ( { target: { value } } ) => {
    const { inputChange } = this.props
    inputChange( value )
  }

  render() {
    const { name,
      title,
      inputRef,
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
          ref={inputRef}
          required={required}
          maxLength={maxLength}
        />
      </Field>
    )
  }
}

export default withValidationAndTransition( ShortTextField )
