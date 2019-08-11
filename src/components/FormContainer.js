import React, { Component, Children } from 'react'
import { func, arrayOf, instanceOf, bool, number, oneOfType, shape } from 'prop-types'
import zenscroll from 'zenscroll'
import _ from 'lodash'

import ProgressBar from './ProgressBar'
import { Provider } from './FormContext'

let fieldContainerRefs = []
let inputRefs = []
let childrenArr = []

/**
 * Container component for the form
 * Maintains the form state and scrolling behaviour between form fields
 */
class FormContainer extends Component {
  state = { form: {}, active: 0, submissionErrors: {} }

  errors = {}

  componentWillMount = () => {
    const { children } = this.props
    childrenArr = Children.toArray( children )
    const formLength = childrenArr.length
    // Create refs for field containers and inputs
    fieldContainerRefs = [ ...Array( formLength + 1 ) ].map( i => React.createRef( i ) )
    inputRefs = [ ...Array( formLength + 1 ) ].map( i => React.createRef( -i ) )
  }

  componentDidMount = () => {
    const { scrollDuration, edgeOffset } = this.props
    // Setup scroll behaviour
    window.noZensmooth = true
    zenscroll.setup( scrollDuration, edgeOffset )
    if ( process.env.NODE_ENV !== 'test' ) inputRefs[ 0 ].current.focus()
  }

  /**
   *  Handles scrolling between form elements and focus on next input field
   *  Handle scrolling behaviour differently depending on platform
   *  @param {Number} i The index of form elements to scroll to
   */
  scrollToRef = i => {
    const { defaultDuration } = zenscroll.setup()

    if ( i <= childrenArr.length ) {
      try {
        zenscroll.to( fieldContainerRefs[ i ].current, null )
        setTimeout( () => { inputRefs[ i ].current.focus() }, defaultDuration )
      } catch ( TypeError ) {
        return
      }
    }

    this.setState( prevState => ( { ...prevState, active: i } ) )
  }

  /**
   * Called by Fields to update the form state in the container
   * @param {String} fieldName The name attribute value of an input field
   * @param {Any} newVal The value to update fieldName to
   * @returns {void}
   */
  onChange = ( fieldName, newVal ) => this.setState(
    ( { form } ) => ( { form: ( { ...form, [ fieldName ]: newVal } ) } ),
  )

  /**
   * Allows fields to register validation errors. This allows checks to occur onSubmit
   * @param {String} fieldName the name of the field in the form with errors
   * @param {Array} err array of strings of errors for given field
   */
  registerValidationError = ( fieldName, err ) => {
    const { submissionErrors } = this.state

    // Clear submission errors for this field since user is trying to rectify them
    if ( submissionErrors[ fieldName ] && submissionErrors[ fieldName ].length !== 0 ) {
      const newState = { ...submissionErrors, [ fieldName ]: [] }
      this.setState( { submissionErrors: newState } )
    }

    // register new errors without re-render
    this.errors = { ...this.errors, [ fieldName ]: err }
  }

  /**
   * Validate inputs and handle result of onSubmit callback
   * @returns {Boolean} true if submission was successful, false otherwise
   */
  submit = () => {
    const { onSubmit } = this.props
    const { form } = this.state

    const isValid = _.reduce(
      _.keys( this.errors ),
      ( bool, fieldName ) => ( bool && this.errors[ fieldName ].length === 0 ),
      true,
    )
    // Run submit callback
    if ( isValid ) {
      const result = onSubmit( form )
      if ( result === true || result === {} || result === undefined ) return true
      this.errors = result
    }

    // Re render with registered errors
    this.setState( prevState => ( { ...prevState, submissionErrors: this.errors } ) )

    // Scroll to first error
    this.scrollToRef(
      _.findIndex(
        childrenArr,
        child => child.props.name === _.keys( this.errors )[ 0 ],
      ),
    )
    return false
  }

  render() {
    const {
      showProgress,
      progressStyle,
    } = this.props

    const { form, active, submissionErrors } = this.state

    return (
      <form style={{ width: '100%', flexDirection: 'column', display: 'flex' }}>
        <Provider value={form}>
          {childrenArr.map(
            ( Field, i ) => {
              const { name } = Field.props
              return React.cloneElement( Field, {
                onChange: this.onChange,
                next: i === childrenArr.length - 1 ? this.submit : () => this.scrollToRef( i + 1 ),
                inputRef: inputRefs[ i ], // Pass ref down to input element for focussing
                containerRef: fieldContainerRefs[ i ],
                registerValidationError: this.registerValidationError,
                submissionErrors: submissionErrors[ name ],
              } )
            },
          )}
        </Provider>

        {showProgress
        && <ProgressBar progress={progress( active, childrenArr.length )} style={progressStyle} />}
      </form>
    )
  }
}

FormContainer.propTypes = {
  /**
   * onSubmit: Function to call upon submission. Recieve form data object as arg.
   * Returns: object of errors, or true if there are none.
   * returned errors object should look like: { field: [ 'err' ], field2: [ 'err' ], ... }
   */
  onSubmit: func.isRequired,
  children: oneOfType( [ arrayOf( // Array of fields (form body)
    instanceOf( Object ),
  ), instanceOf( Object ) ] ).isRequired,
  showProgress: bool, // Whether to show progress bar
  scrollDuration: number, // Scroll animation time
  edgeOffset: number, // Add offset to scroll to prevent field from being hidden by a header
  progressStyle: shape( {
    container: instanceOf( Object ),
    label: instanceOf( Object ),
    bar: instanceOf( Object ),
    innerBar: instanceOf( Object ),
  } ),
}

FormContainer.defaultProps = {
  showProgress: true,
  scrollDuration: 777,
  edgeOffset: 0,
  progressStyle: {},
}

/**
 * @param {Number} i Current position
 * @param {*} length Total length of form
 * @returns {Number} Progress percentage rounded to nearest whole number
 */
const progress = ( i, length ) => Math.round( 100 * ( i ) / length, 0 )

export default FormContainer
