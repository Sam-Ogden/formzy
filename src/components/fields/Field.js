import React from 'react'
import { string, func, instanceOf, arrayOf, bool, shape } from 'prop-types'

import styles from './Field.css'
import { Consumer } from '../FormContext'
import { templateToTitle } from '../../utils/utils'

/**
 * @param {Object} props Field props
 * @returns {Element} Field component with title, description and next button if needed
 *
 * Custom Styling
 * - fieldContainer: style for the container, useful for having different backgrounds across fields
 * - title:
 * - description:
 * - nextButton:
 * - pressEnter: style for the outer span of the 'Press Enter' text
 * - pressEnterInner: style for the inner span i.e. style for the 'Enter' text
 * - errorBar: style for the error bars
 */
const Field = (
  { children, description, title, next, nextBtnText, err, required, containerRef, style },
) => (
  <div
    className={`field ${styles.fieldContainer}`}
    ref={containerRef}
    style={style.fieldContainer}
  >
    <Consumer>
      {form => (
        <h4 className={`title ${styles.title}`} style={style.title}>
          {templateToTitle( title, form )}
          {' '}
          {required ? '*' : ''}
        </h4>
      )}
    </Consumer>

    {description !== ''
     && <p className={`desc ${styles.description}`} style={style.description}>{description}</p>}
    {children}

    <div className="next-button">
      <button className={styles.nextBtn} style={style.nextButton} type="button" onClick={next}>
        {nextBtnText}
      </button>
      <span style={styles.pressEnter}>
          Press
        <span className={styles.bold} style={style.pressEnterInner}> Enter</span>
      </span>
    </div>

    {err.map( ( e, i ) => (
      <div key={i} className={`validation-error ${styles.errorBar}`} style={style.error}>{e}</div>
    ) )}
  </div>
)

Field.propTypes = {
  children: instanceOf( Object ), // The input element
  title: string.isRequired, // The title of the field
  description: string, // Description for additional instructions
  next: func, // The function to call to scroll to the next field
  nextBtnText: string, // Text to display in the next button
  err: arrayOf( string ), // Any errors in the input given by a user
  required: bool,
  containerRef: shape( { current: instanceOf( Element ) } ),
  style: instanceOf( Object ),
}

Field.defaultProps = {
  description: '',
  next: null,
  nextBtnText: 'Next',
  err: [],
  required: false,
  containerRef: null,
  children: null,
  style: {},
}

export default Field
