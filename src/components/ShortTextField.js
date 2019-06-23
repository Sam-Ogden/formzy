/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */

import React, { Component } from 'react'
import { number } from 'prop-types'
import style from './FormField.css'
import Field from './Field'
import { withFieldProps, commonPropTypes, commonDefaultProps } from './hocs/withFieldProps'

class ShortTextField extends Component {
  static propTypes = {
    ...commonPropTypes,
    maxLength: number,
  }

  static defaultProps = {
    ...commonDefaultProps,
    type: 'text',
    maxLength: 524288,
  }

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
      maxLength,
      next,
      err } = this.props

    return (
      <Field title={title} description={description} next={next} err={err}>
        <input
          className={style.input}
          placeholder={placeholder}
          type={type}
          name={name}
          onChange={this.onChange}
          onKeyPress={( { key } ) => ( key === 'Enter' ? next() : null )}
          ref={refProp}
          required={required}
          maxLength={maxLength}
        />
      </Field>
    )
  }
}

export default withFieldProps( ShortTextField )
