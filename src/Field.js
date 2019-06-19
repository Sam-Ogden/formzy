import React from 'react'
import { string, func, instanceOf } from 'prop-types'

import style from './FormField.css'

const Field = ( { children, description, title, next } ) => (
  <div>
    <h4 className={style.title}>{title}</h4>
    {description !== '' && <p className={style.description}>{description}</p>}
    {children}

    {next
          && (
          <div>
            <button className={style.nextBtn} type="button" onClick={next}>Next</button>
            <span>
              Press
              <span className={style.bold}> Enter</span>
            </span>
          </div>
          )
          }
  </div>
)

Field.propTypes = {
  children: instanceOf( Object ).isRequired,
  title: string.isRequired,
  description: string,
  next: func,
}

Field.defaultProps = {
  description: '',
  next: null,
}

export default Field
