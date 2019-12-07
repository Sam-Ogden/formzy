import React, { Component } from 'react'
import { func, string, instanceOf, shape, bool, any, arrayOf } from 'prop-types'
import _ from 'lodash'

import {
  validate,
  validationChecksFromProps,
} from '../../utils/validation'

/**
 * withValidationAndTransition is a higher order component adding common
 * functionality required by all fields
 * @param {Element} WrappedComponent The component to add common functionality to
 * @returns {Class} A new component type with additional functionality added
 */
export const withValidationAndTransition = WrappedComponent => class extends Component {
  state = { value: null, err: [] }

  checks = []

  static propTypes = commonPropTypes

  static defaultProps = commonDefaultProps

  componentDidMount() {
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
    const { registerValidationError, name } = this.props
    this.checks = { ...this.checks, ...checks }
    registerValidationError( name, validate( value, this.checks, this.props ) )
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
    const { registerValidationError, name } = this.props
    _.forEach( methods, ( method, key ) => {
      if ( _.keys( this.checks ).includes( key ) ) {
        this.checks[ key ].func = method
      }
    } )
    registerValidationError( name, validate( value, this.checks, this.props ) )
  }

  /**
   * We store the new value in parent along with validation errors before hitting next/enter
   * Ensures the value and errors are registered incase user scrolls to next field without
   * hitting next btn
   * @param {any} value the new value
   */
  inputChange = value => {
    const { registerValidationError, onChange, name } = this.props
    this.setState( { value } )

    registerValidationError( name, validate( value, this.checks, this.props ) )
    onChange( name, value )
  }

  /**
   * Function called by Fields to progress to the next Field
   * Validation is performed and errors shown before scrolling to next Field
   * @returns {Boolean} result of validation, true if successful
   */
  next = () => {
    const { next: nextProp } = this.props
    const { value } = this.state
    const err = validate( value, this.checks, this.props )
    // Show errors to user when they try to progress
    this.setState( { err } )
    if ( err.length === 0 ) nextProp()
    return err.length === 0
  }

  render() {
    const { next, submissionErrors } = this.props
    const { err } = this.state

    const props = {
      ...this.props,
      inputChange: this.inputChange,
      err: _.union( err, submissionErrors ),
      addValidationChecks: this.addValidationChecks,
      updateValidationChecks: this.updateValidationChecks,
    }

    return <WrappedComponent {...props} next={this.next} />
  }
}

// Props that may be used by all Fields of the form
export const commonPropTypes = {
  // Field container ref for scrolling
  containerRef: shape( { current: instanceOf( Element ) } ),
  title: string, // Title of the Field
  description: string, // Optional description offering instructions
  name: string, // The input field name, values entered by user is stored as [name]: value
  // eslint-disable-next-line react/forbid-prop-types
  defaultValue: any, // The default value the field should take
  required: bool, // Whether a value must be entered by the user
  placeholder: string, // Input placeholder text
  nextBtnText: string, // Text to display in next button
  onChange: func, // This is passed in by FormContainer to update the form state
  next: func, // This is passed in by FormContainer to scroll to the next field
  focusRef: shape( { current: instanceOf( Element ) } ),
  registerValidationError: func, // Pass errors back to FormContainer (to validate when onSubmit)
  submissionErrors: arrayOf( string ),
  style: instanceOf( Object ),
}

export const commonDefaultProps = {
  title: '',
  description: '',
  focusRef: null,
  containerRef: null,
  defaultValue: null,
  name: '',
  required: false,
  placeholder: 'Type your answer here...',
  nextBtnText: 'Next',
  onChange: () => null,
  next: () => true,
  registerValidationError: () => null,
  submissionErrors: [],
  style: {},
}
