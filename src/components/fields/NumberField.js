import React, { Component } from 'react'
import { number, shape, instanceOf } from 'prop-types'

import css from './Field.css'
import Field from './Field'
import { withValidationAndTransition,
  commonPropTypes,
  commonDefaultProps } from '../hocs/withValidationAndTransition'

/**
 * A form field the accepts numbers only
 */
class NumberField extends Component {
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
          ref={focusRef}
          required={required}
          min={min}
          max={max}
        />
      </Field>
    )
  }
}

NumberField.propTypes = {
  ...commonPropTypes,
  min: number,
  max: number,
  style: shape( { numberInput: instanceOf( Object ) } ),
}

NumberField.defaultProps = {
  ...commonDefaultProps,
  min: Number.MIN_VALUE,
  max: Number.MAX_VALUE,
}

export default withValidationAndTransition( NumberField )
