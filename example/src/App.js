import React, { Component } from 'react'

import FormContainer from 'react-form'

export default class App extends Component {
  render () {
    return (
      <div>
        <FormContainer text='Modern React component module' onSubmit={() => console.log('submitting...')} />
      </div>
    )
  }
}
