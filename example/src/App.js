import React, { Component } from 'react'

import { FormContainer, FormField } from 'react-form'

export default class App extends Component {

  onSubmit = (data) => {
    console.log(data)
  }

  render () {
    return (
        <FormContainer fields={fields} onSubmit={this.onSubmit} >
            <FormField name="fname" validate={() => 1} title="What is your First Name?" required/>
            <FormField name="lname" validate={() => 1} title="And your Last Name?" />
            <FormField name="mname" validate={() => 1} title="What is your Middle Name?" />
            <FormField name="email" type="email" validate={() => 1} title="What is your Email Address?" />
            <FormField name="bday" type="date" validate={() => 1} title="When were you born?" />
            <FormField 
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

const fields = [
  <FormField name="fname" validate={() => 1} title="What is your First Name?" required/>,
  <FormField name="lname" validate={() => 1} title="And your Last Name?" />,
  <FormField name="mname" validate={() => 1} title="What is your Middle Name?" />,
  <FormField name="email" type="email" validate={() => 1} title="What is your Email Address?" />,
  <FormField name="bday" type="date" validate={() => 1} title="When were you born?" />,
  <FormField 
    name="degree" 
    type="select" 
    description="For example A levels, bachelors or masters" 
    validate={() => 1} 
    title="What is your highest level of education?" 
  />,

]