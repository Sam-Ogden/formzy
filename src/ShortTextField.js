/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */

import React from 'react'
import style from './FormField.css'
import FormField from './FormField'
import Field from './Field'

export default class ShortTextField extends FormField {
  static propTypes = {
  }

  static defaultProps = {
    type: 'text',
  }

  state = { value: null, err: '' }

  render() {
    const { name, title, refProp, type, required, description, placeholder, maxlength } = this.props
    const { err } = this.state
    return (
      <Field title={title} description={description} next={this.next}>
        <div>
          <input
            className={style.input}
            placeholder={placeholder}
            type={type}
            name={name}
            onChange={this.inputChange}
            onKeyPress={( { key } ) => ( key === 'Enter' ? this.next() : null )}
            ref={refProp}
            required={required}
            maxLength={maxlength}
          />
          <p>{err}</p>
        </div>
      </Field>
    )
  }
}
