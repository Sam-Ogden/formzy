import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( {
  root: {
    width: '100%',
    backgroundColor: 'beige',
    height: 70,
    position: 'fixed',
    bottom: '0%',
    opacity: 0.9,
    borderTop: [ [ '2px', 'solid', '#ccc' ] ],
  },
  inner: {
    paddingLeft: '10vw',
    paddingRight: '10vw',
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  bar: {
    flexBasis: '100%',
    height: '1vh',
    backgroundColor: '#ccc',
    borderRadius: '5px',
  },
  '@media screen and (min-width: 960px)': { bar: { flexBasis: '25%' } },
  label: {
    padding: 0,
    fontSize: '0.8rem',
    marginBottom: '0.2rem',
    marginTop: 0,
    width: '100%',
  },
  progress: {
    height: '100%',
    backgroundColor: '#66aef7',
    WebkitTransition: 'width 1s',
    transition: 'width 1s',
    borderRadius: '5px',
  },
} )
/**
 * Progress bar which is fixes itself to the bottom of the screen
 * @param {Object} progress The percentage progress
 * @returns {Element} A progress bar which is fixed to the bottom of the screen
 */
const ProgressBar = props => {
  const { progress } = props
  const classes = useStyles( props )
  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <p className={classes.label}>{`${progress}% complete`}</p>
        <Progress progress={progress} classes={classes} />
      </div>
    </div>
  )
}
ProgressBar.propTypes = {
  /** Number between 0 and 100 */
  progress: PropTypes.number.isRequired,
}

const Progress = props => {
  const { progress, classes } = props

  return (
    <div className={classes.bar}>
      <div className={classes.progress} style={{ width: `${progress}%` }} />
    </div>
  )
}

Progress.propTypes = {
  progress: PropTypes.number.isRequired,
  classes: PropTypes.objectOf( PropTypes.string ),
}

export default ProgressBar
