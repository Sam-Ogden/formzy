import React, { Component } from 'react'
import { func, arrayOf, instanceOf, bool, number } from 'prop-types'
import zenscroll from 'zenscroll'
import formStyle from './FormContainer.css'
import ProgressBar from './ProgressBar'

let refs = []
let inputRefs = []

export default class FormContainer extends Component {
  static propTypes = {
    onSubmit: func.isRequired,
    children: arrayOf( instanceOf( Object ) ),
    showProgress: bool,
    scrollDuration: number,
    edgeOffset: number,
  }

  static defaultProps = {
    children: {},
    showProgress: true,
    scrollDuration: 777,
    edgeOffset: 0,
  }

  componentWillMount = () => {
    const { children, scrollDuration, edgeOffset } = this.props
    // Create refs for field containers and inputs
    refs = [ ...Array( children.length ) ].map( i => React.createRef( i ) )
    inputRefs = [ ...Array( children.length ) ].map( i => React.createRef( -i ) )
    zenscroll.setup( scrollDuration, edgeOffset )
  }

  state = { form: {}, active: 0 }

  /**
   *  Handles scrolling between form elements and focus on next input field
   *  @param {Number} i The index of form elements to scroll to
   */
  scrollToRef = i => {
    const { children } = this.props
    const { defaultDuration } = zenscroll.setup()
    if ( i < children.length ) {
      zenscroll.to( refs[ i ].current )
      setTimeout( () => { inputRefs[ i ].current.focus() }, defaultDuration )
    }
    this.setState( { active: i } )
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
      active,
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
              next: () => this.scrollToRef( i + 1 ),
              refProp: inputRefs[ i ], // Pass ref down to input element for focussing
            } )}
          </div>
        ) )}
        <button className={formStyle.submit} type="button" onClick={this.submit}>Submit</button>
        {showProgress && <ProgressBar progress={Math.round( 100 * active / children.length, 0 )} />}
      </form>
    )
  }
}

