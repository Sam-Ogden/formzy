import React, { Component } from 'react'

import { FormContainer, FormField } from 'react-form'

const fields = [<FormField />, <FormField />]

export default class App extends Component {
  render () {
    return (
      <div>
        <FormContainer fields={fields} onSubmit={() => console.log('submitting...')} />
      </div>
    )
  }
}
