import React, { Component } from 'react'

import { FormContainer, FormField } from 'react-form'

export default class App extends Component {

  onSubmit = (data) => {
    console.log(data)
  }

  render () {
    return (
      <div>
        <FormContainer fields={fields} onSubmit={this.onSubmit} />
      </div>
    )
  }
}

const fields = [
  <FormField name="fname" validate={() => 1} title="First Name" />,
  <FormField name="lname" validate={() => 1} title="Last Name" />,
  <FormField name="mname" validate={() => 1} title="Middle Name" />,
  <FormField name="email" validate={() => 1} title="Email" />,
  <FormField name="dob" validate={() => 1} title="DOB" />,
]