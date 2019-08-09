import React from 'react'
import { string, func, instanceOf, arrayOf, bool, shape } from 'prop-types'

import style from './Field.css'
import { Consumer } from '../FormContext'
import { templateToTitle } from '../../utils/utils'

/**
 * @param {Object} props Field props
 * @returns {Element} Field component with title, description and next button if needed
 */
const Field = (
  { children, description, title, next, nextBtnText, err, required, containerRef },
) => (
  <div
    className={`field ${style.fieldContainer}`}
    ref={containerRef}
  >
    <Consumer>
      {form => (
        <h4 className={`title ${style.title}`}>
          {templateToTitle( title, form )}
          {' '}
          {required ? '*' : ''}
        </h4>
      )}
    </Consumer>

    {description !== '' && <p className={`desc ${style.description}`}>{description}</p>}
    {children}

    {next
      && (
      <div className="next-button">
        <button className={style.nextBtn} type="button" onClick={next}>{nextBtnText}</button>
        <span>
          Press
          <span className={style.bold}> Enter</span>
        </span>
      </div>
      )
    }

    {err.map( ( e, i ) => ( <div key={i} className={`validation-error ${style.errorBar}`}>{e}</div> ) )}
  </div>
)

Field.propTypes = {
  children: instanceOf( Object ).isRequired, // The input element
  title: string.isRequired, // The title of the field
  description: string, // Description for additional instructions
  next: func, // The function to call to scroll to the next field
  nextBtnText: string, // Text to display in the next button
  err: arrayOf( string ), // Any errors in the input given by a user
  required: bool,
  containerRef: shape( { current: instanceOf( Element ) } ),
}

Field.defaultProps = {
  description: '',
  next: null,
  nextBtnText: 'Next',
  err: [],
  required: false,
  containerRef: null,
}

export default Field
