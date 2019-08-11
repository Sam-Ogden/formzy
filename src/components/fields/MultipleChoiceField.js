import React, { Component } from 'react'
import { arrayOf, string, bool, shape, instanceOf } from 'prop-types'
import _ from 'lodash'

import css from './MultipleChoiceField.css'
import Field from './Field'
import { withValidationAndTransition,
  commonPropTypes,
  commonDefaultProps } from '../hocs/withValidationAndTransition'

/**
 * A form field with a number of choice buttons
 * - Stores responses as an array
 */
class MultipleChoiceField extends Component {
  state = { selected: [] }

  /**
   * Function to call when the user updates the value
   * Selected values are stored in arrays even when there is only 1 selected value
   * @param {String} value the selected value
   */
  onChange = ( { target: { value } } ) => {
    const { inputChange, multiple, inputRef } = this.props
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
    inputRef.current.focus()
  }

  render() {
    const { title,
      description,
      options,
      inputRef,
      containerRef,
      next,
      err,
      required,
      style } = this.props

    const { selected } = this.state

    return (
      <div>
        {/** Hidden button for focus and enter to progress behaviour */}
        <button
          type="button"
          className={css.hiddenButton}
          ref={inputRef}
          onKeyPress={( { key } ) => ( key === 'Enter' ? next() : null )}
        />
        <Field
          title={title}
          description={description}
          next={next}
          err={err}
          required={required}
          containerRef={containerRef}
          style={style}
        >
          <div className="mcf-options-container">
            {options.map( option => {
              const { optionButton, optionButtonActive } = style
              const btnStyle = selected.includes( option )
                ? _.assign( {}, optionButton, optionButtonActive ) : optionButton
              return (
                <button
                  value={option}
                  type="button"
                  onClick={this.onChange}
                  key={option}
                  className={[ selected.includes( option ) ? css.active : '', css.optionButton ].join( ' ' )}
                  style={btnStyle}
                >
                  {option}
                </button>
              )
            } )}
          </div>
        </Field>
      </div>
    )
  }
}

MultipleChoiceField.propTypes = {
  ...commonPropTypes,
  options: arrayOf( string ).isRequired, // The possible options to pick from
  multiple: bool, // Whether the user can select multiple options
  style: shape( {
    optionButton: instanceOf( Object ),
    optionButtonActive: instanceOf( Object ),
  } ),
}

MultipleChoiceField.defaultProps = {
  ...commonDefaultProps,
  multiple: false,
}

export default withValidationAndTransition( MultipleChoiceField )
