import React, { Component } from 'react'
import { func, arrayOf, instanceOf } from 'prop-types'
import formStyle from './formContainer.css'

let refs = []
let inputRefs = []

export default class FormContainer extends Component {
  static propTypes = {
    onSubmit: func.isRequired,
    fields: arrayOf( instanceOf( Object ) ).isRequired,
  }

  componentWillMount = () => {
    const { fields } = this.props

    // Create refs for form fields and inputs
    refs = [ ...Array( fields.length ) ].map( i => React.createRef( i ) )
    inputRefs = [ ...Array( fields.length ) ].map( i => React.createRef( -i ) )
  }

  state = { form: {} }

  /**
   *  Handles scrolling between form elements and focus on next input field
   *  @param {Number} i The index of form elements to scroll to
   *  @returns {Component} FormContainer
   */
  scrollToRef = i => {
    window.scrollTo( 0, refs[ i ].current.offsetTop )
    inputRefs[ i ].current.focus()
  }

  onChange = ( fieldName, newVal ) => this.setState( { form: { [ fieldName ]: newVal } } )

  submit = () => {
    const { onSubmit } = this.props
    const { form } = this.state
    onSubmit( form )
  }

  render() {
    const {
      fields,
    } = this.props

    return (
      <form>
        {fields.map( ( Field, i ) => (
          <div
            className={formStyle.field}
            ref={refs[ i ]}
            key={i}
          >
            {React.cloneElement( Field, {
              onChange: this.onChange,
              next: () => this.scrollToRef( i < refs.length - 1 ? i + 1 : i ),
              refProp: inputRefs[ i ],
            } )}
          </div>
        ) )}
        <div className={formStyle.submit} type="submit" onClick={this.submit}>Submit</div>
      </form>
    )
  }
}

