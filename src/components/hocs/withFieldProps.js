import React, { Component } from 'react'
import { func, string, instanceOf, shape, bool } from 'prop-types'

// Props that may be used by all Fields of the form
export const commonPropTypes = {
  title: string.isRequired, // Title of the Field
  description: string, // Optional description offering instructions
  name: string, // The input field name, values entered by user is stored as [name]: value
  type: string, // The field type
  required: bool, // Whether a value must be entered by the user
  placeholder: string, // Input placeholder text
  onChange: func, // This is passed in by FormContainer to update the form state
  next: func, // This is passed in by FormContainer to scroll to the next field
  refProp: shape( { current: instanceOf( Element ) } ),
  /**
   * the validate function must return an error string if the input is invalid
   * @param {Any} value The value entered by the user
   * @returns {String} an error message if the user made an error, otherwise an empty string
   */
  validate: func,
}

export const commonDefaultProps = {
  description: '',
  refProp: null,
  type: 'text',
  name: '',
  required: false,
  placeholder: 'Type your answer here...',
  validate: () => '',
  onChange: () => null,
  next: () => true,
}

/**
 * withFieldProps is a higher order component adding common functionality required by all fields
 * @param {Element} WrappedComponent The component to add common functionality to
 * @returns {Class} A new component type with additional functionality added
 */
export const withFieldProps = WrappedComponent => class extends Component {
  static propTypes = commonPropTypes

  static defaultProps = commonDefaultProps

  inputChange = value => this.setState( { value } )

  /**
   * Function called by Fields to progress to the next Field
   * Validation is performed and errors shown before scrolling to next Field
   */
  next = () => {
    const { next, validate, onChange, name } = this.props
    const { value } = this.state
    const err = validate( value )
    if ( !err ) {
      onChange( name, value )
      next()
    }

    this.setState( { err } )
  }

  state = { value: null, err: '' }

  render() {
    const { next } = this.props
    const { err } = this.state

    return (
      <div>
        {next
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

      </div>
    )
  }
}
