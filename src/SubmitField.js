/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */

import React from 'react'

import { func, string } from 'prop-types'
import FormField from './FormField'
import Field from './Field'
import style from './FormField.css'

export default class ShortTextField extends FormField {
  static propTypes = {
    onSubmit: func.isRequired,
    buttonText: string,
  }

  static defaultProps = {
    title: 'Thank You!',
    description: 'We will be in touch shortly.',
    buttonText: 'Submit Form',
  }

  render() {
    const { title, description, buttonText, onSubmit, refProp } = this.props
    return (
      <Field title={title} description={description}>
        <div>
          <button className={style.nextBtn} type="button" onClick={onSubmit} ref={refProp}>{buttonText}</button>
        </div>
      </Field>
    )
  }
}
