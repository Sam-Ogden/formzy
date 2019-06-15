import React, { Component } from 'react'
import { func, arrayOf, instanceOf } from 'prop-types'
import formStyle from './formContainer.css'

let refs = []

export default class FormContainer extends Component {
  static propTypes = {
    onSubmit: func,
    fields: arrayOf( instanceOf( Object ) ).isRequired,
  }

  static defaultProps = {
    onSubmit: () => 1,
  }

  componentWillMount = () => {
    const { fields } = this.props

    // Create refs for form fields
    refs = [ ...Array( fields.length ) ].map( i => React.createRef( i ) )
  }

  /**
   *  Handles scrolling between form elements
   *  @param {Number} i The index of form elements to scroll to
   *  @returns {Component} FormContainer
   */
  scrollToRef = i => refs[ i ].current && window.scrollTo( 0, refs[ i ].current.offsetTop )

  onChange = () => 1

  render() {
    const {
      onSubmit,
      fields,
    } = this.props

    return (
      <form>
        {fields.map( ( Field, i ) => (
          <div
            className={formStyle.field}
            ref={refs[ i ]}
            onClick={() => this.scrollToRef( i < refs.length - 1 ? i + 1 : i )}
            key={i}
          >
            {React.cloneElement( Field, {
              onChange: this.onChange,
            } )}
          </div>
        ) )}
        <div className={formStyle.submit} type="submit" onClick={onSubmit}>Submit</div>
      </form>
    )
  }
}

