import React from 'react'
import { string, number } from 'prop-types'
import style from './ProgressBar.css'

/**
 * Progress bar which is fixes itself to the bottom of the screen
 * @param {Object} progress The percentage progress
 * @returns {Element} A progress bar which is fixed to the bottom of the screen
 */
const ProgressBar = ( { progress } ) => (
  <div className={style.progressBar}>
    <div className={style.container}>
      <div className={style.inner}>
        <p className={style.label}>{`${progress}% completed`}</p>
        <Progress progress={progress} />
      </div>
    </div>
  </div>
)
ProgressBar.propTypes = {
  progress: number.isRequired, // Percent to display
}

export const Progress = ( { progress, color, height } ) => {
  const progressStyle = {
    bar: {
      height,
      backgroundColor: '#ccc',
      borderRadius: '5px',
    },
    progress: {
      height: '100%',
      backgroundColor: color,
      WebkitTransition: 'width 1s',
      transition: 'width 1s',
      borderRadius: '5px',
      width: `${progress}%`,
    },
  }

  return (
    <div style={progressStyle.bar}>
      <div style={progressStyle.progress} />
    </div>
  )
}
Progress.propTypes = {
  progress: number.isRequired,
  color: string,
  height: string,
}
Progress.defaultProps = {
  color: '#66aef7',
  height: '1vh',
}

export default ProgressBar
