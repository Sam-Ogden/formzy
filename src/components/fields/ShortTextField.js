import React, { Component } from 'react'
import { number } from 'prop-types'

import style from './Field.css'
import Field from './Field'
import { withFieldPropsAndFieldTransition,
  commonPropTypes,
  commonDefaultProps } from '../hocs/withFieldPropsAndFieldTransition'

/**
 * Form Field that accepts text
 */
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

  /**
   * Function to call when the user updates the value
   */
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
          className={`textfield-input ${style.input}`}
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

export default withFieldPropsAndFieldTransition( ShortTextField )
