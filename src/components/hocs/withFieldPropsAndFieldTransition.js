import React, { Component } from 'react'
import { func, string, instanceOf, shape, bool, any, number } from 'prop-types'

import {
  validateFromArray,
  getValidationMethodsFromProps,
} from '../../utils/validation'

// Props that may be used by all Fields of the form
export const commonPropTypes = {
  title: string.isRequired, // Title of the Field
  description: string, // Optional description offering instructions
  name: string, // The input field name, values entered by user is stored as [name]: value
  fieldIndex: number, // Index of the field in the form
  type: string, // The field type
  // eslint-disable-next-line react/forbid-prop-types
  defaultValue: any, // The default value the field should take
  required: bool, // Whether a value must be entered by the user
  placeholder: string, // Input placeholder text
  onChange: func, // This is passed in by FormContainer to update the form state
  next: func, // This is passed in by FormContainer to scroll to the next field
  refProp: shape( { current: instanceOf( Element ) } ),
  registerValidationError: func, // Pass errors back to FormContainer (to validate when onSubmit)
}

export const commonDefaultProps = {
  description: '',
  refProp: null,
  type: 'text',
  defaultValue: null,
  name: '',
  fieldIndex: 0,
  required: false,
  placeholder: 'Type your answer here...',
  onChange: () => null,
  next: () => true,
  registerValidationError: () => null,
}

/**
 * withFieldPropsAndFieldTransition is a higher order component adding common
 * functionality required by all fields
 * @param {Element} WrappedComponent The component to add common functionality to
 * @returns {Class} A new component type with additional functionality added
 */
export const withFieldPropsAndFieldTransition = WrappedComponent => class extends Component {
  state = { value: null, err: [] }

  static propTypes = commonPropTypes

  static defaultProps = commonDefaultProps

  componentDidMount() {
    const { defaultValue, onChange, name, fieldIndex, registerValidationError } = this.props
    // Set default value and save in FormContainer state
    if ( defaultValue ) {
      this.setState( { value: defaultValue } )
      onChange( name, defaultValue )
    }

    this.requiredValidation = getValidationMethodsFromProps( this.props )
    const err = validateFromArray( defaultValue, this.requiredValidation )
    registerValidationError( fieldIndex, err )
  }

  /**
   * We store the new value in parent along with validation errors before hitting next/enter
   * Ensures the value and errors are registered incase user scrolls to next field without
   * hitting next btn
   * Dont set err state here, only when user tries to progress display error
   * @param {any} value the new value
   */
  inputChange = value => {
    const { registerValidationError, onChange, name, fieldIndex } = this.props
    const err = validateFromArray( value, this.requiredValidation )
    this.setState( { value } )
    registerValidationError( fieldIndex, err )
    onChange( name, value )
  }

  /**
   * Function called by Fields to progress to the next Field
   * Validation is performed and errors shown before scrolling to next Field
   * @returns {Any} result of onChange call or null if errors during validation
   */
  next = () => {
    const { next: nextProp } = this.props
    const { value } = this.state
    const err = validateFromArray( value, this.requiredValidation )
    // Show errors to user when they try to progress
    this.setState( { err } )
    if ( err.length === 0 ) {
      nextProp()
      return true
    }
    return false
  }

  render() {
    const { next } = this.props
    const { err } = this.state

    return next
      ? (
        <WrappedComponent
          {...this.props}
          inputChange={this.inputChange}
          next={this.next}
          err={err}
        />
      )
      : (
        <WrappedComponent
          {...this.props}
          inputChange={this.inputChange}
          err={err}
        />
      )
  }
}
