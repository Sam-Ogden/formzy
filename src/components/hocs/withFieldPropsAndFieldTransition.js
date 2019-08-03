import React, { Component } from 'react'
import { func, string, instanceOf, shape, bool, any, number, arrayOf } from 'prop-types'
import _ from 'lodash'

import {
  validate,
  validationChecksFromProps,
} from '../../utils/validation'

/**
 * withFieldPropsAndFieldTransition is a higher order component adding common
 * functionality required by all fields
 * @param {Element} WrappedComponent The component to add common functionality to
 * @returns {Class} A new component type with additional functionality added
 */
export const withFieldPropsAndFieldTransition = WrappedComponent => class extends Component {
  state = { value: null, err: [] }

  checks = []

  static propTypes = commonPropTypes

  static defaultProps = commonDefaultProps

  componentWillMount() {
    const { defaultValue, onChange, name } = this.props
    // Set default value and save in FormContainer state
    if ( defaultValue ) {
      this.setState( { value: defaultValue } )
      onChange( name, defaultValue )
    }

    /**
     * Set default validation. Can be overridden inside fields
     * using props.updateValidationChecks and props.addValidationChecks
     */
    this.addValidationChecks( validationChecksFromProps( this.props ) )
  }

  /**
   * Update the checks actually performed on inputs. Allows a field to introduce non-standard checks
   * E.g. DateField requires extra validation to ensure valid date is passed. This should be a given
   * and shouldnt require a developer to pass a prop requesting this check
   * Run validation after update and register errs with parent
   * @param {Object} checks { checkName: { func: function, test: val }, ... }
   */
  addValidationChecks = checks => {
    const { value } = this.state
    const { registerValidationError, fieldIndex } = this.props
    this.checks = { ...this.checks, ...checks }
    registerValidationError( fieldIndex, validate( value, this.checks, this.props ) )
  }

  /**
   * If a function with given name is being used in checks then it is updated with function given
   * Allows overriding default methods
   * Run validation after update and register errs with parent
   * @param {Object} methods functions to add/override default validation methods with
   * {funcName: <function>, func2name: <function>, ...}
   */
  updateValidationChecks = methods => {
    const { value } = this.state
    const { registerValidationError, fieldIndex } = this.props
    _.forEach( methods, ( method, key ) => {
      if ( _.keys( this.checks ).includes( key ) ) {
        this.checks[ key ].func = method
      }
    } )
    registerValidationError( fieldIndex, validate( value, this.checks, this.props ) )
  }

  /**
   * We store the new value in parent along with validation errors before hitting next/enter
   * Ensures the value and errors are registered incase user scrolls to next field without
   * hitting next btn
   * @param {any} value the new value
   */
  inputChange = value => {
    const { registerValidationError, onChange, name, fieldIndex } = this.props
    this.setState( { value } )

    const err = validate(
      value, this.checks, this.props,
    )

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
    const err = validate(
      value, this.checks, this.props,
    )
    // Show errors to user when they try to progress
    this.setState( { err } )
    if ( err.length === 0 ) {
      nextProp()
      return true
    }
    return false
  }

  render() {
    const { next, submissionErrors } = this.props
    const { err } = this.state

    return next
      ? (
        <WrappedComponent
          {...this.props}
          inputChange={this.inputChange}
          next={this.next}
          err={_.union( err, submissionErrors )}
          addValidationChecks={this.addValidationChecks}
          updateValidationChecks={this.updateValidationChecks}
        />
      )
      : (
        <WrappedComponent
          {...this.props}
          inputChange={this.inputChange}
          err={_.union( err, submissionErrors )}
          updateValidationChecks={this.updateValidationChecks}
          updateValidationMethods={this.updateValidationMethods}
        />
      )
  }
}

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
  submissionErrors: arrayOf( string ),
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
  submissionErrors: [],
}
