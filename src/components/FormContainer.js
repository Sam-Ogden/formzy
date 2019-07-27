import React, { Component, Children } from 'react'
import { func, arrayOf, instanceOf, bool, number, string, oneOfType } from 'prop-types'
import zenscroll from 'zenscroll'
import is from 'is_js'

import formStyle from './FormContainer.css'
import ProgressBar from './ProgressBar'
import SubmitField from './fields/SubmitField'

/**
 * TODO
 * -  Validation: pass in an object of validation (max, min, limit, required)
 *    and pass this and value to validate value
 */

let fieldContainerRefs = [] // to scroll to the container of a Field
let inputRefs = [] // to focus on the next input of a field
let childrenArr = []
const validationFuncs = {}

/**
 * @param {Number} i Current position
 * @param {*} length Total length of form
 * @returns {Number} Progress percentage rounded to nearest whole number
 */
const progress = ( i, length ) => Math.round( 100 * ( i ) / length, 0 )

/**
 *
 * @param {Number} i The index of the field in the form
 * @param {Element} Field A field component (e.g. NumberField, DateField etc)
 * @param {Function} onChange The function to call when this Field is changed
 * @param {Function} setDefaultValue Method to set default value without validation
 * @param {String} err The validation err if any for given input for this field
 * @returns {Element} The field wrapped in a container
 */
const FieldContainer = ( i, Field, onChange, setDefaultValue, err ) => (
  <div
    className={formStyle.fieldContainer}
    ref={fieldContainerRefs[ i ]}
    key={i}
  >
    {React.cloneElement( Field, {
      onChange,
      refProp: inputRefs[ i ], // Pass ref down to input element for focussing
      setDefaultValue,
      err,
      fieldIndex: i,
    } )}
  </div>
)

/**
 * Container component for the form
 * Maintains the form state and scrolling behaviour between form fields
 */
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
    const { children } = this.props
    const formLength = children.length || 1
    // Create refs for field containers and inputs
    fieldContainerRefs = [ ...Array( formLength + 1 ) ].map( i => React.createRef( i ) )
    inputRefs = [ ...Array( formLength + 1 ) ].map( i => React.createRef( -i ) )
    // If single child is passed then convert it to array
    childrenArr = Array.isArray( children ) ? children : Children.toArray( children )
  }

  componentDidMount = () => {
    const { scrollDuration, edgeOffset } = this.props
    // Setup scroll behaviour
    zenscroll.setup( scrollDuration, edgeOffset )
    // Get validation funcs from children
    childrenArr.forEach( Field => {
      const { name, validate } = Field.props
      validationFuncs[ name ] = validate
    } )
  }

  state = { form: {}, active: 0, errors: {} }

  /**
   *  Handles scrolling between form elements and focus on next input field
   *  Handle scrolling behaviour differently depending on platform
   *  @param {Number} i The index of form elements to scroll to
   */
  scrollToRef = i => {
    const { defaultDuration } = zenscroll.setup()

    if ( i <= childrenArr.length ) {
      if ( is.ios() ) {
        inputRefs[ i ].current.focus()
        if ( i === childrenArr.length ) zenscroll.center( inputRefs[ i ].current )
      } else {
        zenscroll.to( fieldContainerRefs[ i ].current )
        setTimeout( () => { inputRefs[ i ].current.focus() }, defaultDuration - 50 )
      }
    }

    this.setState( { active: i } )
  }

  /**
   * Called by Fields to update the form state in the container
   * @param {String} fieldName The name attribute value of an input field
   * @param {Any} newVal The value to update fieldName to
   * @param {Number} fieldIndex The index of the field being updated
   */
  onChange = ( fieldName, newVal, fieldIndex ) => {
    const { form, errors } = this.state
    const error = validationFuncs[ fieldName ] ? validationFuncs[ fieldName ]( newVal ) : ''

    if ( error !== '' ) {
      this.setState( { form: ( { ...form, [ fieldName ]: newVal } ),
        errors: { ...errors, [ fieldName ]: error } } )
    } else {
      this.scrollToRef( fieldIndex + 1 )
      this.setState( { form: ( { ...form, [ fieldName ]: newVal } ) } )
    }
  }

  /**
   * @param {String} fieldName name of field to update
   * @param {Any} value the value to set for fieldname
   */
  setDefaultValue = ( fieldName, value ) => {
    const { form } = this.state
    this.setState( { form: { ...form, [ fieldName ]: value } } )
  }

  /**
   * Function to run when submit button is hit
   * @returns {Any} onSubmit prop function call
   */
  submit = () => {
    const { onSubmit } = this.props
    const { form } = this.state

    // Validate inputs
    const fields = Object.keys( validationFuncs )
    const errors = {}
    fields.forEach( fieldName => {
      const error = validationFuncs[ fieldName ]( form[ fieldName ] )
      if ( error !== '' ) errors[ fieldName ] = error
    } )

    // scroll to first field with error or submit if no errors
    if ( Object.keys( errors ).length !== 0 ) {
      const fieldIndexOfError = childrenArr.findIndex(
        obj => obj.props.name === Object.keys( errors )[ 0 ],
      )
      this.scrollToRef( fieldIndexOfError )
      return this.setState( { errors } )
    }
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
      errors,
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
          ( Field, i ) => {
            const { name } = Field.props
            return FieldContainer(
              i, Field, this.onChange, this.setDefaultValue, errors[ name ],
            )
          },
        )}

        {FieldContainer( childrenArr.length, submitComponent, this.onChange )}

        {showProgress && <ProgressBar progress={progress( active, childrenArr.length )} />}
      </form>
    )
  }
}
