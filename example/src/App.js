import React from 'react'
import { FormContainer, ShortTextField, NumberField, DateField, MultipleChoiceFIeld,
         InformationField, SubmitField } from 'react-formtype'

export default () => (
  <FormContainer 
    showProgress={true} 
    onSubmit={data => console.log(data)}
    progressStyle={{ innerBar: { backgroundColor: 'black' } }}
  >
    <InformationField 
      title="Hello, Welcome To The Fruit Order Form" 
      description="Ready to start?" 
      nextBtnText="Lets Go"
    />
    <ShortTextField 
      title="First off, what's your name?" 
      name="name" 
      minTextLength={2} 
      required 
    />
    <MultipleChoiceFIeld 
      title="Nice to meet you {{_.name}}, what fruit would you like?" 
      name="fruits" 
      options={['Banana', 'Apple', 'Orange', 'Pear']} 
      multiple
      style={{ 
        optionButtonActive: { 
          borderColor: '#66aef7', color: 'black', fontWeight: 'bold'
        }
      }}
    />
    <NumberField 
      title="How many free oranges do you want?" 
      name="noranges"
      min={0}
      defaultValue={5}
    />
    <DateField 
      title="When would you like your {{_.noranges}} oranges?" 
      name="orrangedate" 
      required
    />
    <SubmitField 
      title="Thanks!" 
      description="You will have your fruit shortly." 
      nextBtnText="Send Form" 
    />
  </FormContainer>
)