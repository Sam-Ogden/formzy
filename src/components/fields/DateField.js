import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import has from 'lodash/has'
import { makeStyles } from '@material-ui/core/styles'

import Field from './Field'
import fieldStyles from './FieldStyle'
import {
  withValidationAndTransition,
  commonPropTypes,
} from '../hocs/withValidationAndTransition'

const useStyles = makeStyles( {
  dateInputContainer: {
    display: 'inline-block',
    marginRight: 15,
    '& $inputField, $inputField:focus': {
      width: '5em',
      display: 'block',
      padding: '0.5rem',
      borderRadius: 5,
      border: 'none',
    },
  },
  dateTitle: {
    width: 100,
    margin: 0,
  },
  inputField: {},
  ...fieldStyles,
} )
const requiredTest = ( value, isRequired, props ) => (
  isRequired
   && (
     !has( value, 'day' )
   || !has( value, 'month' )
   || !has( value, 'year' )
   || ( props.includeTime && !has( value, 'time' ) ) )
    ? 'All fields are required' : ''
)

/**
 *
 * @param {Object} value user date input
 * @param {*} testVal value passed by validate
 * @param {*} props component props passed by validate
 * @returns {String} result of validating the date values given
 */
const validateDate = ( value, testVal, props ) => {
  if ( value && testVal ) {
    const { day, month, year, time } = value
    if ( !day || !month || !year || ( props.includeTime && !time ) ) {
      return 'All fields must be completed'
    }
  }
  return ''
}

/**
 * Form Field that takes date and time values.
 * Value is returned as { day: ..., month: ..., year: ..., time: ... }
 */
const DateField = props => {
  const {
    title,
    focusRef,
    containerRef,
    required,
    description,
    includeTime,
    inputChange,
    next,
    err,
    addValidationChecks,
    updateValidationChecks,
    className,
  } = props

  const [ value, setValue ] = useState( null )
  const classes = useStyles( props )

  useEffect( () => {
    // Override the required function with func specific to DateField
    updateValidationChecks( { required: requiredTest, validateDate } )
    addValidationChecks( { validateDate: { func: validateDate, test: true } } )
  }, [] )

  /**
   * Store values for each component of date seperatly
   */
  const handleInputChange = ( { target: { name, value: val } } ) => {
    const newDate = { ...value, [ name ]: val }
    setValue( newDate )
    inputChange( newDate )
  }

  return (
    <Field
      title={title}
      description={description}
      next={next}
      err={err}
      required={required}
      containerRef={containerRef}
      className={className}
      classes={classes}
    >
      <div role="presentation" onKeyPress={( { key } ) => ( key === 'Enter' ? next() : null )}>
        <DateFieldContainer title="Day:" classes={classes}>
          <input
            name="day"
            type="number"
            placeholder="dd"
            onChange={handleInputChange}
            ref={focusRef}
            required={required}
            className={classes.inputField}
          />
        </DateFieldContainer>
        <DateFieldContainer title="Month:" classes={classes}>
          <input
            name="month"
            type="number"
            placeholder="mm"
            onChange={handleInputChange}
            required={required}
            className={classes.inputField}
          />
        </DateFieldContainer>
        <DateFieldContainer title="Year:" classes={classes}>
          <input
            name="year"
            type="number"
            placeholder="yyyy"
            onChange={handleInputChange}
            required={required}
            className={classes.inputField}
          />
        </DateFieldContainer>
        {includeTime
              && (
                <DateFieldContainer title="Time:" classes={classes}>
                  <input
                    name="time"
                    type="time"
                    placeholder="00:00"
                    onChange={handleInputChange}
                    required={required}
                    className={classes.inputField}
                  />
                </DateFieldContainer>
              )}
      </div>
    </Field>
  )
}

DateField.propTypes = {
  ...commonPropTypes,
  includeTime: PropTypes.bool, // Whether to display time input field
  addValidationChecks: PropTypes.func.isRequired,
  updateValidationChecks: PropTypes.func.isRequired,
}

const DateFieldContainer = (
  { title, children, classes: { dateInputContainer, dateTitle } },
) => (
  <span className={dateInputContainer}>
    <span className={dateTitle}>{title}</span>
    {children}
  </span>
)

DateFieldContainer.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.instanceOf( Object ).isRequired,
  classes: PropTypes.objectOf( PropTypes.string ),
}

export default withValidationAndTransition( DateField )
