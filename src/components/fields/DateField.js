import React, { Component } from 'react'
import { bool, func } from 'prop-types'
import _ from 'lodash'

import style from './DateField.css'
import Field from './Field'
import { withFieldPropsAndFieldTransition,
  commonPropTypes,
  commonDefaultProps } from '../hocs/withFieldPropsAndFieldTransition'
import { defaultValidationMethods, getValidationMethodsFromProps } from '../../utils/validation'

const required = ( value, isRequired ) => (
  isRequired
   && ( !_.has( value, 'day' ) || !_.has( value, 'month' ) || !_.has( value, 'year' ) )
    ? 'This field is required' : ''
)

/**
 *
 * @param {Object} value user date input
 * @param {*} [customValidation] value passed by validateFromArray
 * @param {*} props component props passed by validateFromArray
 * @returns {String} result of validating the date values given
 */
const validateDate = ( value, customValidation, props ) => {
  if ( value && customValidation ) {
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
    setupValidation: func.isRequired,
  }

  static defaultProps = {
    ...commonDefaultProps,
    type: 'date',
    includeTime: false,
  }

  state = { value: null }

  componentDidMount() {
    const { setupValidation } = this.props
    let requiredValidation = getValidationMethodsFromProps( this.props )
    const validationMethods = { ...defaultValidationMethods, required, validateDate }
    requiredValidation = requiredValidation.concat( [ { validateDate: true } ] )
    setupValidation( requiredValidation, validationMethods )
  }

  /**
   * Function to call when the user updates a date input field
   * Have 4 values for each component of the date
   */
  onChange = ( { target: { name, value } } ) => {
    const { inputChange } = this.props
    const { value: val } = this.state
    const newDate = { value: ( { ...val, [ name ]: value } ) }
    this.setState( newDate )
    inputChange( newDate.value )
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
          <span className={style.dateInputContainer}>
            <span className={style.dateTitles}>Day:</span>
            <input
              name="day"
              type="number"
              placeholder="dd"
              onChange={this.onChange}
              ref={refProp}
              required={required}
              className={`datefield-day ${style.inputField}`}
              min={0}
              max={31}
            />
          </span>
          <span className={style.dateInputContainer}>
            <span className={style.dateTitles}>Month:</span>
            <input
              name="month"
              type="number"
              placeholder="mm"
              onChange={this.onChange}
              required={required}
              className={`datefield-month ${style.inputField}`}
              min={1}
              max={12}
            />
          </span>
          <span className={style.dateInputContainer}>
            <span className={style.dateTitles}>Year:</span>
            <input
              name="year"
              type="number"
              placeholder="yyyy"
              onChange={this.onChange}
              required={required}
              className={`datefield-year ${style.inputField}`}
              min={0}
            />
          </span>
          {includeTime
              && (
              <span className={style.dateInputContainer}>
                <span className={style.dateTitles}>Time:</span>
                <input
                  name="time"
                  type="time"
                  placeholder="00:00"
                  onChange={this.onChange}
                  required={required}
                  className={`datefield-time ${style.inputField}`}
                />
              </span>
              )}
        </div>
      </Field>
    )
  }
}

export default withFieldPropsAndFieldTransition( DateField )
