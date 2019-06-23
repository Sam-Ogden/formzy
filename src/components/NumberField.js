/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */

import React, { Component } from 'react'
import { number } from 'prop-types'
import style from './FormField.css'
import Field from './Field'
import { withScrollBehaviour, commonPropTypes, commonDefaultProps } from './hocs/withScrollBehaviour'

class NumberField extends Component {
  static propTypes = {
    ...commonPropTypes,
    min: number,
    max: number,
  }

  static defaultProps = {
    ...commonDefaultProps,
    type: 'number',
    min: Number.MIN_VALUE,
    max: Number.MAX_VALUE,
  }

  state = { err: '' }

  onChange = ( { target: { value } } ) => {
    const { inputChange } = this.props
    inputChange( value )
  }

  render() {
    const { name,
      title,
      refProp,
      type,
      required,
      description,
      placeholder,
      min,
      max,
      next } = this.props

    const { err } = this.state

    return (
      <Field title={title} description={description} next={next}>
        <div>
          <input
            className={style.input}
            placeholder={placeholder}
            type={type}
            name={name}
            onChange={this.onChange}
            onKeyPress={( { key } ) => ( key === 'Enter' ? next() : null )}
            ref={refProp}
            required={required}
            min={min}
            max={max}
          />
          <p>{err}</p>
        </div>
      </Field>
    )
  }
}

export default withScrollBehaviour( NumberField )
