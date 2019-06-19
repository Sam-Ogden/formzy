/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */

import React from 'react'
import { string, bool } from 'prop-types'
import style from './DateField.css'
import FormField from './FormField'
import Field from './Field'

export default class DateField extends FormField {
  static propTypes = {
    min: string,
    max: string,
    includeTime: bool,
  }

  static defaultProps = {
    type: 'date',
    min: '',
    max: '',
    includeTime: false,
  }

  state = { value: null, err: '' }

  inputChange = ( { target: { name, value } } ) => {
    const { value: val } = this.state
    this.setState( { value: ( { ...val, [ name ]: value } ) } )
  }

  render() {
    const { title, refProp, required, description, includeTime } = this.props
    const { err } = this.state
    return (
      <Field title={title} description={description} next={this.next}>
        <div>
          <div onKeyPress={( { key } ) => ( key === 'Enter' ? this.next() : null )}>
            <span className={style.dateInputContainer}>
              <span className={style.dateTitles}>Day:</span>
              <input
                label="day"
                name="day"
                type="number"
                placeholder="dd"
                onChange={this.inputChange}
                ref={refProp}
                required={required}
                className={style.inputField}
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
                onChange={this.inputChange}
                required={required}
                className={style.inputField}
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
                onChange={this.inputChange}
                required={required}
                className={style.inputField}
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
                  onChange={this.inputChange}
                  required={required}
                  className={style.inputField}
                />
              </span>
              )}
          </div>
          <p>{err}</p>
        </div>
      </Field>
    )
  }
}
