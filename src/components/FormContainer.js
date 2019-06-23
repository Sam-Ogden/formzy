import React, { Component, Children } from 'react'
import { func, arrayOf, instanceOf, bool, number, string, oneOfType } from 'prop-types'
import zenscroll from 'zenscroll'
import is from 'is_js'
import formStyle from './FormContainer.css'
import ProgressBar from './ProgressBar'
import SubmitField from './SubmitField'

let refs = []
let inputRefs = []
let childrenArr = []

const progress = ( i, length ) => Math.round( 100 * ( i ) / length, 0 )

const FieldContainer = ( i, Field, onChange, scrollToRef ) => (
  <div
    className={formStyle.fieldContainer}
    ref={refs[ i ]} // Ref to scroll to element
    key={i}
  >
    {React.cloneElement( Field, {
      onChange,
      next: () => scrollToRef( i + 1 ),
      refProp: inputRefs[ i ], // Pass ref down to input element for focussing
    } )}
  </div>
)

export default class FormContainer extends Component {
  static propTypes = {
    onSubmit: func.isRequired, // Function to call upon submission. Accept object as argument.
    children: oneOfType( [ arrayOf( // Array of fields (form body)
      instanceOf( Object ),
    ), instanceOf( Object ) ] ).isRequired,
    showProgress: bool, // Whether to show progress bar
    scrollDuration: number, // Scroll animation time
    edgeOffset: number, // Add offset to scroll to prevent field from being hidden by a header
    submitTitle: string, // Title of the Submit field
    submitDescription: string,
    submitButtonText: string,
  }

  static defaultProps = {
    showProgress: true,
    scrollDuration: 777,
    edgeOffset: 0,
    submitTitle: 'Thank You!',
    submitDescription: '',
    submitButtonText: 'Submit Form',
  }

  componentWillMount = () => {
    const { children, scrollDuration, edgeOffset } = this.props
    const formLength = children.length || 1
    // Create refs for field containers and inputs
    refs = [ ...Array( formLength + 1 ) ].map( i => React.createRef( i ) )
    inputRefs = [ ...Array( formLength + 1 ) ].map( i => React.createRef( -i ) )
    // Setup scroll behaviour
    zenscroll.setup( scrollDuration, edgeOffset )
    // If single child is passed then convert it to array
    childrenArr = Array.isArray( children ) ? children : Children.toArray( children )
  }

  state = { form: {}, active: 0 }

  /**
   *  Handles scrolling between form elements and focus on next input field
   *  @param {Number} i The index of form elements to scroll to
   */
  scrollToRef = i => {
    const { children } = this.props
    const { defaultDuration } = zenscroll.setup()
    const formLength = children.length || 1
    if ( i <= formLength ) {
      if ( is.ios() ) {
        inputRefs[ i ].current.focus()
        if ( i === formLength ) zenscroll.center( inputRefs[ i ].current )
      } else {
        zenscroll.to( refs[ i ].current )
        setTimeout( () => { inputRefs[ i ].current.focus() }, defaultDuration - 50 )
      }
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
      showProgress,
      submitTitle,
      submitDescription,
      submitButtonText,
    } = this.props

    const {
      active,
    } = this.state

    const submitComponent = (
      <SubmitField
        onSubmit={this.submit}
        title={submitTitle}
        description={submitDescription}
        buttonText={submitButtonText}
      />
    )

    return (
      <form className={formStyle.formContainer}>
        {childrenArr.map(
          ( Field, i ) => FieldContainer( i, Field, this.onChange, this.scrollToRef ),
        )}

        {FieldContainer( childrenArr.length, submitComponent, this.onChange )}

        {showProgress && <ProgressBar progress={progress( active, childrenArr.length )} />}
      </form>
    )
  }
}
