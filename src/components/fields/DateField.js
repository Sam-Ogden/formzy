import React, { Component } from 'react'
import { bool } from 'prop-types'

import style from './DateField.css'
import Field from './Field'
import { withFieldPropsAndFieldTransition,
  commonPropTypes,
  commonDefaultProps } from '../hocs/withFieldPropsAndFieldTransition'

/**
 * Form Field that takes date and time values.
 * A custom input is used instead of type="date", this is to provide consistency across browsers
 * The value is stored as { day: ..., month: ..., year: ..., time: ... }
 */
class DateField extends Component {
  static propTypes = {
    ...commonPropTypes,
    includeTime: bool, // Whether to display time input field
  }

  static defaultProps = {
    ...commonDefaultProps,
    type: 'date',
    includeTime: false,
  }

  state = { value: null }

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
