import React from 'react'
import { string, func, instanceOf, arrayOf, bool, shape } from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import Button from '@material-ui/core/Button'
import { Consumer } from '../FormContext'
import { templateToTitle } from '../../utils/utils'

const useStyles = makeStyles( () => ( {
  fieldRoot: {
    height: '60vh',
    display: 'inline-block',
    alignItems: 'center',
    justifyContent: 'left',
    paddingLeft: '10vw',
    paddingRight: '10vw',
    paddingBottom: '25vh',
    paddingTop: '25vh',
    maxWidth: '100%',
    '& input': {
      border: 0,
      borderBottom: [ [ 2, 'solid', '#555' ] ],
      backgroundColor: 'transparent',
      height: '6vh',
      width: '100%',
      fontSize: '1.4em',
      transition: 'border 0.2s',
    },
    '& input:focus': {
      outline: 'none',
      borderBottom: [ [ 2, 'solid', 'transparent' ] ],
    },
  },
  nextButton: {
    padding: [ [ 10, 20 ] ],
    fontSize: '1em',
    borderRadius: 5,
    marginRight: 10,
    cursor: 'pointer',
    fontWeight: 'bold',
    border: 'none',
    marginTop: 15,
  },
  title: {
    fontSize: '1.6em',
    marginBottom: 10,
    marginTop: '0vh',
  },
  description: {
    color: '#777',
    fontSize: '1.2em',
  },
  error: {
    marginTop: '20px',
    backgroundColor: 'indianred',
    padding: '10px',
    borderRadius: 5,
    color: 'beige',
    fontWeight: 'bold',
  },
  '@media (min-width: 960px)': { title: { fontSize: '2em' } },
  nextActionDescription: { '& span': { fontWeight: 'bold' } },
} ) )

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
    nextBtnText = 'Next',
    err = [],
    required = false,
    containerRef,
    className,
  } = props

  const classes = useStyles( props )

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
      {children}

      <div>
        <Button classes={{ root: classes.nextButton }} onClick={next} variant="contained">
          {nextBtnText}
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
  children: instanceOf( Object ), // The input element
  className: string,
  title: string.isRequired, // The title of the field
  description: string, // Description for additional instructions
  next: func, // The function to call to scroll to the next field
  nextBtnText: string, // Text to display in the next button
  err: arrayOf( string ), // Any errors in the input given by a user
  required: bool,
  containerRef: shape( { current: instanceOf( Element ) } ),
}

export default Field
