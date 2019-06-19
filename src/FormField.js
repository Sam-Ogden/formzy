/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */

import React, { Component } from 'react'
import { func, string, instanceOf, shape, bool, number } from 'prop-types'

export default class FormField extends Component {
  static propTypes = {
    title: string.isRequired,
    description: string,
    name: string.isRequired,
    type: string,
    required: bool,
    placeholder: string,
    maxlength: number,
    hasNext: bool,
    validate: func,
    onChange: func,
    next: func,
    refProp: shape( { current: instanceOf( Element ) } ),
  }

  static defaultProps = {
    description: '',
    refProp: null,
    type: 'text',
    required: false,
    placeholder: 'Type your answer here...',
    maxlength: 524288,
    hasNext: true,
    validate: () => true,
    onChange: () => null,
    next: () => true,
  }

  state = { value: null, err: '' }

  inputChange = ( { target: { value } } ) => this.setState( { value } )

  next = () => {
    const { next, validate, onChange, name } = this.props
    const { value } = this.state
    const res = validate( value )
    if ( res ) {
      onChange( name, value )
      next()
    } else {
      this.setState( { err: res.err } )
    }
  }

  render() {
    const { name, title, refProp, type, required, description, placeholder, maxlength, hasNext } = this.props
    const { err } = this.state
    return (
      <div />
    )
  }
}
