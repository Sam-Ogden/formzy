import React, { Component } from 'react'
import { number } from 'prop-types'

import css from './Field.css'
import Field from './Field'
import { withValidationAndTransition,
  commonPropTypes,
  commonDefaultProps } from '../hocs/withValidationAndTransition'

/**
 * A form field the accepts numbers only
 *
 * Custom styling
 * - numberInput: style the input field
 */
class NumberField extends Component {
  static propTypes = {
    ...commonPropTypes,
    min: number,
    max: number,
  }

  static defaultProps = {
    ...commonDefaultProps,
    min: Number.MIN_VALUE,
    max: Number.MAX_VALUE,
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
      min,
      max,
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
          className={`numberfield-input ${css.input}`}
          placeholder={placeholder}
          type="number"
          style={style.numberInput}
          name={name}
          onChange={this.onChange}
          onKeyPress={( { key } ) => ( key === 'Enter' ? next() : null )}
          ref={inputRef}
          required={required}
          min={min}
          max={max}
        />
      </Field>
    )
  }
}

export default withValidationAndTransition( NumberField )
