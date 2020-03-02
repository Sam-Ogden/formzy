import React, { useState, Children } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { reduce, keys } from 'lodash'
import { makeStyles } from '@material-ui/core/styles'
import ProgressBar from './ProgressBar'
import { Provider } from './FormContext'
import useScroll from './useScroll'

const useStyles = makeStyles( {
  root: {
    width: '100%',
    flexDirection: 'column',
    display: 'flex',
  },
  fieldContainer: {
    width: '100%',
    position: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '100%',
    zIndex: '-1',
  },
  progressRoot: {},
  progressInnerContainer: {},
  progressBar: {},
  progressLabel: {},
  progressTransition: {},
} )

function FormContainer( props ) {
  const {
    className,
    showProgress = true,
    progressStyle = {},
    scrollDuration = 777,
    edgeOffset = 0,
    children,
    onSubmit,
  } = props

  const [ form, setForm ] = useState( {} )
  const [ submissionErrors, setSubmissionErrors ] = useState( {} )
  const [ progress, setProgress ] = useState( 0 )
  const classes = useStyles( props )
  const mapNameToIndex = {}
  let errors = {}

  const handleScroll = i => setProgress( calcProgress( i, Children.count( children ) ) )
  const onChange = ( fieldName, newVal ) => setForm( { ...form, [ fieldName ]: newVal } )

  /**
   * Allows fields to register validation errors. This allows checks to occur onSubmit
   * @param {String} fieldName the name of the field in the form with errors
   * @param {Array} err array of strings of errors for given field
   */
  const registerValidationError = ( fieldName, err ) => {
    // Clear submission errors for this field since user is trying to rectify them
    if ( submissionErrors[ fieldName ] && submissionErrors[ fieldName ].length !== 0 ) {
      setSubmissionErrors( { ...submissionErrors, [ fieldName ]: [] } )
    }

    // register new errors without re-render
    errors = { ...errors, [ fieldName ]: err }
  }

  const submit = () => {
    const isValid = reduce(
      keys( errors ),
      ( bool, fieldName ) => ( bool && errors[ fieldName ].length === 0 ),
      true,
    )

    if ( isValid ) {
      const result = onSubmit( form )
      if ( !( result === true || result === {} || result === undefined ) ) {
        setSubmissionErrors( { ...submissionErrors, submissionErrors: result } )
      }
    }
  }

  const childrenProps = useScroll( children, scrollDuration, edgeOffset, handleScroll, submit )

  return (
    <form className={classnames( classes.root, className )}>
      <div className={classes.fieldContainer} />
      <Provider value={form}>
        {Children.map( children,
          ( Field, i ) => {
            const { name } = Field.props
            mapNameToIndex[ name ] = i
            return React.cloneElement( Field, {
              onChange,
              registerValidationError,
              submissionErrors: submissionErrors[ name ],
              ...childrenProps[ i ],
            } )
          } )}
      </Provider>
      {showProgress
        && (
        <ProgressBar
          progress={progress}
          style={progressStyle}
          classes={{
            root: classes.progressRoot,
            inner: classes.progressInnerContainer,
            bar: classes.progressBar,
            label: classes.progressLabel,
            progress: classes.progressTransition,
          }}
        />
        )}
    </form>
  )
}

FormContainer.propTypes = {
  /**
   * onSubmit: Function to call upon submission. Recieve form data object as arg.
   * Returns: object of errors, or true if there are none.
   * returned errors object should look like: { field: [ 'err' ], field2: [ 'err' ], ... }
   */
  onSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType( [ PropTypes.arrayOf( // Array of fields (form body)
    PropTypes.instanceOf( Object ),
  ), PropTypes.instanceOf( Object ) ] ).isRequired,
  showProgress: PropTypes.bool, // Whether to show progress bar
  scrollDuration: PropTypes.number, // Scroll animation time
  /**
   * Add offset to scroll to prevent field from being hidden by a header
   */
  edgeOffset: PropTypes.number,
  progressStyle: PropTypes.shape( {
    container: PropTypes.instanceOf( Object ),
    label: PropTypes.instanceOf( Object ),
    bar: PropTypes.instanceOf( Object ),
    innerBar: PropTypes.instanceOf( Object ),
  } ),
}

const calcProgress = ( i, length ) => Math.round( 100 * ( i ) / length, 0 )

export default FormContainer
