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
    const { name, title, refProp, type, required, description, placeholder, maxlength } = this.props
    const { err } = this.state
    return (
      <div>
        <h4 className={style.title}>{title}</h4>
        {description !== '' && <p className={style.description}>{description}</p>}
        <input
          className={style.input}
          placeholder={placeholder}
          type={type}
          name={name}
          onChange={this.inputChange}
          onKeyPress={( { key } ) => ( key === 'Enter' ? this.next() : null )}
          ref={refProp}
          required={required}
          maxLength={maxlength}
        />
        <p>{err}</p>
        <button className={style.nextBtn} type="button" onClick={this.next}>Next</button>
        <span>Press <span className={style.bold}>Enter</span></span>
      </div>
    )
  }
}
