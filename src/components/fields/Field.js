import React from 'react'
import { string, func, instanceOf } from 'prop-types'

import style from './Field.css'

/**
 * @param {Object} props Field props
 * @returns {Element} Field component with title, description and next button if needed
 */
const Field = ( { children, description, title, next, err } ) => (
  <div className="field">
    <h4 className={`title ${style.title}`}>{title}</h4>
    {description !== '' && <p className={`desc ${style.description}`}>{description}</p>}
    {children}

    {next
      && (
      <div className="next-button">
        <button className={style.nextBtn} type="button" onClick={next}>Next</button>
        <span>
          Press
          <span className={style.bold}> Enter</span>
        </span>
      </div>
      )
    }

    {err && <div className={`validation-error ${style.errorBar}`}>{err}</div>}
  </div>
)

Field.propTypes = {
  children: instanceOf( Object ).isRequired, // The input element
  title: string.isRequired, // The title of the field
  description: string, // Description for additional instructions
  next: func, // The function to call to scroll to the next field
  err: string, // Any errors in the input given by a user
}

Field.defaultProps = {
  description: '',
  next: null,
  err: '',
}

export default Field