import React, { Component } from 'react'

import { 
  FormContainer, 
  ShortTextField, 
  NumberField, 
  DateField, 
  MultipleChoiceFIeld, 
  InformationField 
} from 'react-formtype'

const opts = ['Banana', 'Apple', 'Orange', 'Pear']

export default class App extends Component {

  /**
   * onSubmit callback should return true if no errors, or an object of errors of the form
   * { fieldName: [ 'err', 'err1' ], anotherField: [ 'e1', 'e2' ] }
   */
  submit = data => {
    console.log(data)
    return {name: ['error']}
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
        <InformationField 
          title="Hello, Welcome To The Fruit Order Form" 
          description="Ready to start?" 
          nextBtnText="Lets Go" 
        />
        <ShortTextField title="First off, what's your name?" name="name" minTextLength={2} required />
        <MultipleChoiceFIeld 
          title="Nice to meet you {{_.name}}, what fruit would you like?" 
          name="fruits" 
          options={opts} 
          multiple
        />
        <NumberField 
          title="How many free oranges do you want?" 
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
