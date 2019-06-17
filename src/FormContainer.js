import React, { Component } from 'react'
import { func, arrayOf, instanceOf, bool } from 'prop-types'
import formStyle from './FormContainer.css'
import ProgressBar from './ProgressBar'

let refs = []
let inputRefs = []

export default class FormContainer extends Component {
  static propTypes = {
    onSubmit: func.isRequired,
    children: arrayOf( instanceOf( Object ) ),
    showProgress: bool,
  }

  static defaultProps = {
    children: {},
    showProgress: true,
  }

  componentWillMount = () => {
    const { children } = this.props
    // Create refs for field containers and inputs
    refs = [ ...Array( children.length ) ].map( i => React.createRef( i ) )
    inputRefs = [ ...Array( children.length ) ].map( i => React.createRef( -i ) )
  }

  state = { form: {}, progress: 0 }

  /**
   *  Handles scrolling between form elements and focus on next input field
   *  @param {Number} i The index of form elements to scroll to
   */
  scrollToRef = i => {
    window.scrollTo( 0, refs[ i ].current.offsetTop )
    inputRefs[ i ].current.focus()
  }

  onChange = ( fieldName, newVal ) => {
    const { form } = this.state
    this.setState( { form: ( { ...form, [ fieldName ]: newVal } ) } )
  }

  submit = () => {
    const { onSubmit } = this.props
    const { form } = this.state
    return onSubmit( form )
  }

  render() {
    const {
      children,
      showProgress,
    } = this.props

    const {
      progress,
    } = this.state

    return (
      <form className={formStyle.formContainer}>
        {children.length > 0 && children.map( ( Field, i ) => (
          <div
            className={formStyle.fieldContainer}
            ref={refs[ i ]} // Ref to scroll to element
            key={i}
          >
            {React.cloneElement( Field, {
              onChange: this.onChange,
              next: () => this.scrollToRef( i < refs.length - 1 ? i + 1 : i ),
              refProp: inputRefs[ i ], // Pass ref down to input element for focussing
            } )}
          </div>
        ) )}
        <button className={formStyle.submit} type="button" onClick={this.submit}>Submit</button>
        {showProgress && <ProgressBar progress={progress} />}
      </form>
    )
  }
}

