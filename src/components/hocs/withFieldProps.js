/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */

import React, { Component } from 'react'
import { func, string, instanceOf, shape, bool } from 'prop-types'

export const commonPropTypes = {
  title: string.isRequired,
  description: string,
  name: string.isRequired,
  type: string,
  required: bool,
  placeholder: string,
  validate: func,
  onChange: func,
  next: func,
  refProp: shape( { current: instanceOf( Element ) } ),
}

export const commonDefaultProps = {
  description: '',
  refProp: null,
  type: 'text',
  required: false,
  placeholder: 'Type your answer here...',
  validate: () => null,
  onChange: () => null,
  next: () => true,
}

export const withFieldProps = WrappedComponent => class extends Component {
  static propTypes = commonPropTypes

  static defaultProps = commonDefaultProps

  inputChange = value => this.setState( { value } )

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
