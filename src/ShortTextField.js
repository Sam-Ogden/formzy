/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */

import React, { Component } from 'react'
import { number } from 'prop-types'
import style from './FormField.css'
import Field from './Field'
import { withScrollBehaviour, commonPropTypes, commonDefaultProps } from './withScrollBehaviour'

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

  state = { err: '' }

  render() {
    const { name,
      title,
      refProp,
      type,
      required,
      description,
      placeholder,
      maxLength,
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
            maxLength={maxLength}
          />
          <p>{err}</p>
        </div>
      </Field>
    )
  }
}

export default withScrollBehaviour( ShortTextField )
