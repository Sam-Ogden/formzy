import React, { Component } from 'react'
import { arrayOf, string, bool } from 'prop-types'

import style from './MultipleChoiceField.css'
import Field from './Field'
import { withFieldProps, commonPropTypes, commonDefaultProps } from '../hocs/withFieldProps'

/**
 * A form field with a number of choice buttons
 */
class MultipleChoiceField extends Component {
  static propTypes = {
    ...commonPropTypes,
    options: arrayOf( string ).isRequired, // The possible options to pick from
    multiple: bool, // Whether the user can select multiple options
  }

  static defaultProps = {
    ...commonDefaultProps,
    multiple: false,
  }

  state = { selected: [] }

  /**
   * Function to call when the user updates the value
   * Selected values are stored in arrays even when there is only 1 selected value
   * @param {String} value the selected value
   */
  onChange = ( { target: { value } } ) => {
    const { inputChange, multiple, refProp } = this.props
    const { selected } = this.state
    let newValue = [ value ]

    // If value in array then remove it, otherwise add it
    if ( multiple ) {
      newValue = selected.includes( value )
        ? selected.filter( val => val !== value ) : [ ...selected, value ]
    }

    this.setState( { selected: newValue } )
    inputChange( newValue )

    // Focus on hidden button to allow enter key event to progress
    refProp.current.focus()
  }

  render() {
    const { title,
      description,
      options,
      refProp,
      next,
      err } = this.props

    const { selected } = this.state

    return (
      <div>
        {/** Hidden button for focus and enter to progress behaviour */}
        <button
          type="button"
          className={style.hiddenButton}
          ref={refProp}
          onKeyPress={( { key } ) => ( key === 'Enter' ? next() : null )}
        />
        <Field title={title} description={description} next={next} err={err}>
          <div className="mcf-options-container">
            {options.map( option => (
              <button
                value={option}
                type="button"
                onClick={this.onChange}
                key={option}
                className={[ selected.includes( option ) ? style.active : '', style.optionButton ].join( ' ' )}
              >
                {option}
              </button>
            ) )}
          </div>
        </Field>
      </div>
    )
  }
}

export default withFieldProps( MultipleChoiceField )
