import React, { Component } from 'react'

import { FormContainer, ShortTextField, NumberField, DateField, MultipleChoiceFIeld } from 'react-formtype'

const opts = ['Banana', 'Apple', 'Orange', 'Pear']

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
        submitDescription="You will have your fruit shortly."
      >
        <ShortTextField title="Hi, what's your name?" name="name" minTextLength={2} required />
        <MultipleChoiceFIeld 
          title="Nice to meet you {{_.name}}, what fruit would you like?" 
          name="fruits" 
          options={opts} 
          multiple/>
        <NumberField 
          title="How many oranges would you like?" 
          name="noranges" 
          min={0} 
          max={10}
          defaultValue={5}
        />
        <DateField title="When would you like your {{_.noranges}} oranges?" name="orrangedate" required/>
      </FormContainer>
    )
  }
}
