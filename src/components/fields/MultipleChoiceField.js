import React, { useState } from 'react'
import { arrayOf, string, bool } from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import Field from './Field'
import {
  withValidationAndTransition,
  commonPropTypes,
} from '../hocs/withValidationAndTransition'

const useStyles = makeStyles( {
  optionButton: {
    display: 'block',
    margin: [ [ 10, 0 ] ],
    padding: [ [ 5, 10 ] ],
    backgroundColor: 'beige',
    border: [ [ 2, 'solid', 'black' ] ],
    borderRadius: 5,
    transitionDuration: '125ms',
    cursor: 'pointer',
    '&:focus': { outline: 'none' },
  },
  hiddenButton: {
    height: 0,
    width: 0,
    margin: 0,
    padding: 0,
    border: 0,
  },
  active: { },
} )
/**
 * A form field with a number of choice buttons
 * - Stores responses as an array
 */
const MultipleChoiceField = props => {
  const {
    title,
    description,
    options,
    focusRef,
    containerRef,
    next,
    err,
    required,
    inputChange,
    multiple = false,
    className,
  } = props
  const classes = useStyles( props )
  const [ selected, setSelected ] = useState( [] )

  const onChange = ( { target: { value } } ) => {
    let newValue = [ value ]

    // If value in array then remove it, otherwise add it
    if ( multiple ) {
      newValue = selected.includes( value )
        ? selected.filter( val => val !== value ) : [ ...selected, value ]
    }

    setSelected( newValue )
    inputChange( newValue )

    // Focus on hidden button to allow enter key event to progress
    focusRef.current.focus()
  }

  return (
    <div>
      {/** Hidden button for focus and enter to progress behaviour */}
      <button
        type="button"
        className={classes.hiddenButton}
        ref={focusRef}
        onKeyPress={( { key } ) => ( key === 'Enter' ? next() : null )}
      />
      <Field
        title={title}
        description={description}
        next={next}
        err={err}
        required={required}
        containerRef={containerRef}
        className={className}
      >
        <div>
          {options.map( option => (
            <button
              type="button"
              value={option}
              onClick={onChange}
              key={option}
              className={classnames( classes.optionButton,
                { [ classes.active ]: selected.includes( option ) } )}
              disableRipple
            >
              {option}
            </button>
          ) )}
        </div>
      </Field>
    </div>
  )
}

MultipleChoiceField.propTypes = {
  ...commonPropTypes,
  options: arrayOf( string ).isRequired, // The possible options to pick from
  multiple: bool, // Whether the user can select multiple options
}

export default withValidationAndTransition( MultipleChoiceField )
