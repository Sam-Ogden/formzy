import React, { Component } from 'react'
import { bool, func, string, instanceOf } from 'prop-types'
import _ from 'lodash'

import style from './DateField.css'
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
 * A custom input is used instead of type="date", this is to provide consistency across browsers
 * The value is stored as { day: ..., month: ..., year: ..., time: ... }
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
    type: 'date',
    includeTime: false,
  }

  state = { value: null }

  componentDidMount() {
    const { addValidationChecks, updateValidationChecks } = this.props
    // Override the required function without func specific to DateField
    updateValidationChecks( { required, validateDate } )
    addValidationChecks( { validateDate: { func: validateDate, test: true } } )
  }

  /**
   * Function to call when the user updates a date input field
   * Have 4 values for each component of the date
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
      refProp,
      required,
      description,
      includeTime,
      next,
      err } = this.props

    return (
      <Field title={title} description={description} next={next} err={err}>
        <div role="presentation" onKeyPress={( { key } ) => ( key === 'Enter' ? next() : null )}>
          <DateFieldContainer title="Day:">
            <input
              name="day"
              type="number"
              placeholder="dd"
              onChange={this.onChange}
              ref={refProp}
              required={required}
              className={`datefield-day ${style.inputField}`}
            />
          </DateFieldContainer>
          <DateFieldContainer title="Month:">
            <input
              name="month"
              type="number"
              placeholder="mm"
              onChange={this.onChange}
              required={required}
              className={`datefield-month ${style.inputField}`}
            />
          </DateFieldContainer>
          <DateFieldContainer title="Year:">
            <input
              name="year"
              type="number"
              placeholder="yyyy"
              onChange={this.onChange}
              required={required}
              className={`datefield-year ${style.inputField}`}
            />
          </DateFieldContainer>
          {includeTime
              && (
                <DateFieldContainer title="Time:">
                  <input
                    name="time"
                    type="time"
                    placeholder="00:00"
                    onChange={this.onChange}
                    required={required}
                    className={`datefield-time ${style.inputField}`}
                  />
                </DateFieldContainer>
              )}
        </div>
      </Field>
    )
  }
}

const DateFieldContainer = ( { title, children } ) => (
  <span className={style.dateInputContainer}>
    <span className={style.dateTitles}>{title}</span>
    {children}
  </span>
)
DateFieldContainer.propTypes = {
  title: string.isRequired,
  children: instanceOf( Object ).isRequired,
}
export default withValidationAndTransition( DateField )
