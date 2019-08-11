import React from 'react'
import { number, instanceOf, shape } from 'prop-types'
import assign from 'lodash/assign'

import css from './ProgressBar.css'
/**
 * Progress bar which is fixes itself to the bottom of the screen
 * @param {Object} progress The percentage progress
 * @returns {Element} A progress bar which is fixed to the bottom of the screen
 *
 * Custom Styling
 * - container: progress bar container (setting background color)
 * - label: style for the % complete label
 * - bar: styles relating to the empty progress bar
 * - innerBar: style the inner bar which moves inside bar
 */
const ProgressBar = ( { progress, style: { container, label, bar, innerBar } } ) => (
  <div className={css.container} style={container}>
    <div className={css.inner}>
      <p className={css.label} style={label}>{`${progress}% complete`}</p>
      <Progress progress={progress} style={{ bar, innerBar }} />
    </div>
  </div>
)
ProgressBar.propTypes = {
  progress: number.isRequired, // Percent to display
  style: shape( {
    container: instanceOf( Object ),
    label: instanceOf( Object ),
    bar: instanceOf( Object ),
    innerBar: instanceOf( Object ),
  } ),
}
ProgressBar.defaultProps = {
  style: {},
}

export const Progress = ( { progress, style: { bar, innerBar } } ) => {
  const barStyle = assign( {}, {
    height: '1vh',
    backgroundColor: '#ccc',
    borderRadius: '5px',
  }, bar )
  const progressStyle = assign( {}, {
    height: '100%',
    backgroundColor: '#66aef7',
    WebkitTransition: 'width 1s',
    transition: 'width 1s',
    borderRadius: '5px',
    width: `${progress}%`,
  }, innerBar )

  return (
    <div style={barStyle} className={css.bar}>
      <div style={progressStyle} />
    </div>
  )
}

Progress.propTypes = {
  progress: number.isRequired,
  style: shape( {
    bar: instanceOf( Object ),
    innerBar: instanceOf( Object ),
  } ),
}
Progress.defaultProps = {
  style: {},
}

export default ProgressBar
