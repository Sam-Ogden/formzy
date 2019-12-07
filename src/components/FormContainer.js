import React, { Component, Children } from 'react'
import { func, arrayOf, instanceOf, bool, number, oneOfType, shape } from 'prop-types'
import _ from 'lodash'

import ProgressBar from './ProgressBar'
import { Provider } from './FormContext'
import ScrollController from './ScrollController'

const formBackground = { width: '100%',
  position: 'fixed',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  height: '100%',
  zIndex: '-1' }
/**
 * Container component for the form
 * Maintains the form state and scrolling behaviour between form fields
 */
class FormContainer extends Component {
  state = { form: {}, submissionErrors: {}, progress: 0 }

  errors = {}

  mapNameToIndex = {}

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

    if ( isValid ) {
      const result = onSubmit( form )
      if ( result === true || result === {} || result === undefined ) return true
      this.errors = result
    }

    // Re render with registered errors
    const firstErrorIndex = this.mapNameToIndex[
      _.findKey( this.mapNameToIndex, ( i, name ) => (
        this.errors.name !== undefined
          ? this.errors[ name ].length > 0
          : false
      ) )
    ]

    this.setState( prevState => (
      { ...prevState, submissionErrors: this.errors }
    ) )

    return firstErrorIndex
  }

  render() {
    const {
      showProgress,
      progressStyle,
      style,
      scrollDuration,
      edgeOffset,
      children,
    } = this.props

    const { form, progress, submissionErrors } = this.state

    return (
      <form style={{ width: '100%', flexDirection: 'column', display: 'flex' }}>
        <div style={_.assign( {}, formBackground, style.background )} />
        <Provider value={form}>
          <ScrollController
            scrollDuration={scrollDuration}
            edgeOffset={edgeOffset}
            onChange={i => this.setState(
              { progress: calcProgress( i, Children.count( children ) ) },
            )}
            onFinalNext={this.submit}
          >
            {Children.map( children,
              ( Field, i ) => {
                const { name } = Field.props
                this.mapNameToIndex[ name ] = i
                return React.cloneElement( Field, {
                  onChange: this.onChange,
                  registerValidationError: this.registerValidationError,
                  submissionErrors: submissionErrors[ name ],
                } )
              } )}
          </ScrollController>
        </Provider>
        {showProgress
        && <ProgressBar progress={progress} style={progressStyle} />}
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
  style: shape( { background: instanceOf( Object ) } ),
}

FormContainer.defaultProps = {
  showProgress: true,
  scrollDuration: 777,
  edgeOffset: 0,
  progressStyle: {},
  style: {},
}

/**
 * @param {Number} i Current position
 * @param {*} length Total length of form
 * @returns {Number} Progress percentage rounded to nearest whole number
 */
const calcProgress = ( i, length ) => Math.round( 100 * ( i ) / length, 0 )

export default FormContainer
