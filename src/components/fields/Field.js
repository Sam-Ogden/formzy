import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Button from '@material-ui/core/Button'
import { Consumer } from '../FormContext'
import { templateToTitle } from '../../utils/utils'

/**
 * @param {Object} props Field props
 * @returns {Element} Field component with title, description and next button if needed
 */
const Field = props => {
  const {
    children,
    description = '',
    title,
    next = () => undefined,
    nextButtonText = 'Next',
    err = [],
    required = false,
    containerRef,
    className,
    classes,
  } = props

  return (
    <div
      className={classnames( classes.fieldRoot, className )}
      ref={containerRef}
    >
      <Consumer>
        {form => (
          <h4 className={classes.title}>
            {templateToTitle( title, form )}
            {' '}
            {required ? '*' : ''}
          </h4>
        )}
      </Consumer>

      {description !== ''
        && <p className={classes.description}>{description}</p>}
      <div className={classes.fieldChildrenContainer}>
        {children}
      </div>

      <div className={classes.fieldAction}>
        <Button classes={{ root: classes.nextButton }} onClick={next} variant="contained">
          {nextButtonText}
        </Button>
        <span className={classes.nextActionDescription}>
          Press
          <span> Enter</span>
        </span>
      </div>

      {err.map( ( e, i ) => (
        <div key={i} className={classes.error}>{e}</div>
      ) )}
    </div>
  )
}

Field.propTypes = {
  children: PropTypes.instanceOf( Object ), // The input element
  className: PropTypes.string,
  title: PropTypes.string.isRequired, // The title of the field
  description: PropTypes.string, // Description for additional instructions
  next: PropTypes.func, // The function to call to scroll to the next field
  nextButtonText: PropTypes.string, // Text to display in the next button
  err: PropTypes.arrayOf( PropTypes.string ), // Any errors in the input given by a user
  required: PropTypes.bool,
  containerRef: PropTypes.shape( { current: PropTypes.instanceOf( Element ) } ),
  classes: PropTypes.objectOf( PropTypes.string ),
}

export default Field
