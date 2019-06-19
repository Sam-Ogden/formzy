import React, { Component } from 'react'

import { FormContainer, ShortTextField, NumberField, DateField } from 'react-form'

export default class App extends Component {

  submit = (data) => {
    console.log(data)
  }

  render () {
    return (
        <FormContainer onSubmit={this.submit} showProgress={true}>
            <ShortTextField 
              name="fname" 
              validate={() => 1} 
              title="What is your First Name?" 
              maxlength={25} 
              required />
            <ShortTextField name="lname" validate={() => 1} title="What is your Last Name?" />
            <ShortTextField name="email" type="email" validate={() => 1} title="What is your Email Address?" />
            <DateField name="bday" type="date" validate={() => 1} title="When were you born?" />
            <NumberField name="ngcses" validate={() => 1} max={10} title="How many GCSEs do you have?" />
            <ShortTextField 
              name="degree" 
              type="select" 
              description="For example A levels, bachelors or masters" 
              validate={() => 1} 
              title="What is your highest level of education?" 
            />
        </FormContainer>
    )
  }
}
