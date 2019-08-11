import React, { Component } from 'react'
import { bool, func, string, instanceOf } from 'prop-types'
import _ from 'lodash'

import css from './DateField.css'
import Field from './Field'
import {
  withValidationAndTransition,
  commonPropTypes,
  commonDefaultProps,
} from '../hocs/withValidationAndTransition'

const required = ( value, isRequired, props ) => (
  isRequired
   && (
     !_.has( value, 'day' )
   || !_.has( value, 'month' )
   || !_.has( value, 'year' )
   || ( props.includeTime && !_.has( value, 'time' ) ) )
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
 *
 * Custom Styling
 * - dateInput: styling for all the input fields
 * - dateInputContainer: styling for container around an input element
 * - dateInputLabel: styling for label of each input element
 */
class DateField extends Component {
  static propTypes = {
    ...commonPropTypes,
    includeTime: bool, // Whether to display time input field
    addValidationChecks: func.isRequired,
    updateValidationChecks: func.isRequired,
  }

  static defaultProps = {
    ...commonDefaultProps,
    includeTime: false,
  }

  state = { value: null }

  componentDidMount() {
    const { addValidationChecks, updateValidationChecks } = this.props
    // Override the required function with func specific to DateField
    updateValidationChecks( { required, validateDate } )
    addValidationChecks( { validateDate: { func: validateDate, test: true } } )
  }

  /**
   * Store values for each component of date seperatly
   */
  onChange = ( { target: { name, value: val } } ) => {
    this.setState( ( { value } ) => ( { value: ( { ...value, [ name ]: val } ) } ), () => {
      const { inputChange } = this.props
      const { value } = this.state
      inputChange( value )
    } )
  }

  render() {
    const { title,
      inputRef,
      containerRef,
      required,
      description,
      includeTime,
      next,
      err,
      style } = this.props

    return (
      <Field
        title={title}
        description={description}
        next={next}
        err={err}
        required={required}
        containerRef={containerRef}
        style={style}
      >
        <div role="presentation" onKeyPress={( { key } ) => ( key === 'Enter' ? next() : null )}>
          <DateFieldContainer style={style} title="Day:">
            <input
              name="day"
              type="number"
              placeholder="dd"
              onChange={this.onChange}
              ref={inputRef}
              required={required}
              className={`datefield-day ${css.inputField}`}
              style={style.dateInput}
            />
          </DateFieldContainer>
          <DateFieldContainer style={style} title="Month:">
            <input
              name="month"
              type="number"
              placeholder="mm"
              onChange={this.onChange}
              required={required}
              className={`datefield-month ${css.inputField}`}
              style={style.dateInput}
            />
          </DateFieldContainer>
          <DateFieldContainer style={style} title="Year:">
            <input
              name="year"
              type="number"
              placeholder="yyyy"
              onChange={this.onChange}
              required={required}
              className={`datefield-year ${css.inputField}`}
              style={style.dateInput}
            />
          </DateFieldContainer>
          {includeTime
              && (
                <DateFieldContainer style={style} title="Time:">
                  <input
                    name="time"
                    type="time"
                    placeholder="00:00"
                    onChange={this.onChange}
                    required={required}
                    className={`datefield-time ${css.inputField}`}
                    style={style.dateInput}
                  />
                </DateFieldContainer>
              )}
        </div>
      </Field>
    )
  }
}

const DateFieldContainer = ( { title, children, style } ) => (
  <span className={css.dateInputContainer} style={style.dateInputContainer}>
    <span className={css.dateTitles} style={style.dateInputLabel}>{title}</span>
    {children}
  </span>
)

DateFieldContainer.propTypes = {
  title: string.isRequired,
  children: instanceOf( Object ).isRequired,
  style: instanceOf( Object ),
}

DateFieldContainer.defaultProps = {
  style: {},
}
export default withValidationAndTransition( DateField )
