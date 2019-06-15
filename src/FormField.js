/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */

import React, { Component } from 'react'
import { func, string, instanceOf, shape } from 'prop-types'

// eslint-disable-next-line react/prefer-stateless-function
export default class FormField extends Component {
  static propTypes = {
    name: string.isRequired,
    title: string.isRequired,
    validate: func,
    onChange: func,
    next: func,
    refProp: shape( { current: instanceOf( Element ) } ),
  }

  static defaultProps = {
    onChange: () => null,
    validate: () => true,
    next: () => true,
    refProp: null,
  }

  state = { err: '' }

  inputChange = ( { target: { name, value } } ) => {
    const { validate, onChange } = this.props
    const res = validate()
    return res ? onChange( name, value ) : this.setState( { err: res.err } )
  }

  render() {
    const { name, title, next, refProp } = this.props
    const { err } = this.state
    return (
      <div>
        <h4>{title}</h4>
        <input
          name={name}
          onChange={this.inputChange}
          onKeyPress={( { key } ) => ( key === 'Enter' ? next() : null )}
          ref={refProp}
        />
        <p>{err}</p>
        <button type="button" onClick={next}>Next</button>
      </div>
    )
  }
}
