import React, { Component, Fragment } from 'react'
import { arrayOf, string, bool } from 'prop-types'

import css from './MultipleChoiceField.css'
import Field from './Field'
import { withValidationAndTransition,
  commonPropTypes,
  commonDefaultProps } from '../hocs/withValidationAndTransition'

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
      <Fragment>
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
            {options.map( option => (
              <button
                value={option}
                type="button"
                onClick={this.onChange}
                key={option}
                className={[ selected.includes( option ) ? css.active : '', css.optionButton ].join( ' ' )}
                style={style.mcfOptionButton}
              >
                {option}
              </button>
            ) )}
          </div>
        </Field>
      </Fragment>
    )
  }
}

export default withValidationAndTransition( MultipleChoiceField )
