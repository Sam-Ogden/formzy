import React, { Component } from 'react'
import { func, string } from 'prop-types'

import Field from './Field'
import style from './Field.css'
import { withFieldProps, commonPropTypes, commonDefaultProps } from '../hocs/withFieldProps'

/**
 * Submit Field is a Field without a value
 * Does not have a next option
 */
class SubmitField extends Component {
  static propTypes = {
    ...commonPropTypes,
    onSubmit: func.isRequired,
    buttonText: string,
  }

  static defaultProps = {
    ...commonDefaultProps,
    title: 'Thank You!',
    description: 'We will be in touch shortly.',
    buttonText: 'Submit Form',
  }

  render() {
    const { title, description, buttonText, onSubmit, refProp } = this.props
    return (
      <Field title={title} description={description}>
        <button className={style.nextBtn} type="button" onClick={onSubmit} ref={refProp}>{buttonText}</button>
      </Field>
    )
  }
}

export default withFieldProps( SubmitField )
