import React, { Component } from 'react'

import { FormContainer, ShortTextField, NumberField, DateField } from 'react-form'

const orangeValidation = value => value >= 0 ? '' : 'Number of oranges must be greater than or equal to 0'

export default class App extends Component {

  submit = (data) => {
    console.log(data)
  }

  render () {
    return (
      <FormContainer 
        showProgress={true} 
        onSubmit={this.submit}
        submitTitle="Thanks!" 
        submitButtonText="Send form"
        submitDescription="We will be in touch shortly."
      >
        <ShortTextField title="What is your name?" name="name" required />
        <NumberField 
          title="How many oranges would you like?" 
          name="noranges" 
          validate={orangeValidation} 
          min={0} 
          max={10} 
        />
        <DateField title="When were you born?" name="dob" />
      </FormContainer>
    )
  }
}
