import React from 'react'
import { number } from 'prop-types'
import { Progress } from 'reactstrap'
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
        <Progress className={style.bar} color="#66aef7" value={progress} />
      </div>
    </div>
  </div>
)

ProgressBar.propTypes = {
  progress: number.isRequired, // Percent to display
}

export default ProgressBar
