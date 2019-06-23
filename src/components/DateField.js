/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */

import React, { Component } from 'react'
import { string, bool } from 'prop-types'
import style from './DateField.css'
import Field from './Field'
import { withScrollBehaviour, commonPropTypes, commonDefaultProps } from './hocs/withScrollBehaviour'

class DateField extends Component {
  static propTypes = {
    ...commonPropTypes,
    min: string,
    max: string,
    includeTime: bool,
  }

  static defaultProps = {
    ...commonDefaultProps,
    type: 'date',
    min: '',
    max: '',
    includeTime: false,
  }

  state = { value: null, err: '' }

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
      next } = this.props

    const { err } = this.state

    return (
      <Field title={title} description={description} next={next}>
        <div>
          <div onKeyPress={( { key } ) => ( key === 'Enter' ? next() : null )}>
            <span className={style.dateInputContainer}>
              <span className={style.dateTitles}>Day:</span>
              <input
                label="day"
                name="day"
                type="number"
                placeholder="dd"
                onChange={this.onChange}
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
                onChange={this.onChange}
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
                onChange={this.onChange}
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
                  onChange={this.onChange}
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

export default withScrollBehaviour( DateField )
