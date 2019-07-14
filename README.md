# react-form
>
[![NPM](https://img.shields.io/npm/v/react-form.svg)](https://www.npmjs.com/package/react-form) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A react library for building forms with similar functionality to TypeForm.

## Install
```bash

npm install --save react-formtype

```
## Usage

```jsx
import React, { Component } from  'react'
import { FormContainer, ShortTextField, NumberField, DateField } from  'react-formtype'

class  Example  extends  Component {

render () {
  return (
    <FormContainer
      showProgress={true}
      onSubmit={formData  => {...}}
      submitTitle="Thanks!"
      submitButtonText="Send form"
    >
      <ShortTextField  title="What is your name?"  name="name"  required />
      <NumberField  title="How many oranges would you like?"  name="noranges"  min={0}  max={10} />
      <DataField  title="When were you born?"  name="dob" />
    </FormContainer>
    )
  }
}

```

## Components
[FormContainer](#FormContainer)
[ShortTextField](#ShortTextField)
[NumberField](#NumberField)
[DateField](#DateField)
[MultipleChoiceField](#MultipleChoiceField)

### FormContainer
Container component for handling form state and transitions between form fields. 
**All Fields in the form must be children of the FormContainer component.**
```jsx
static propTypes  = {
  onSubmit: func.isRequired, // Function to call upon submission. Accept object as argument.
  children: oneOfType( [ arrayOf( // Array of fields (form body)
  instanceOf( Object ),
  ), instanceOf( Object ) ] ).isRequired,
  showProgress: bool, // Whether to show progress bar
  scrollDuration: number, // Scroll animation time
  edgeOffset: number, // Add offset to scroll to prevent field from being hidden by a header
  submitTitle: string, // Title of the Submit field
  submitDescription: string,
  submitButtonText: string,
}

static defaultProps  = {
  showProgress: true,
  scrollDuration: 777,
  edgeOffset: 0,
  submitTitle: 'Thank You!',
  submitDescription: '',
  submitButtonText: 'Submit Form',
}
```
## Field Components
Field components are always children of the FormContainer component
All fields have a common set of props as shown below, as well as additional props relevant only to themselves 
```jsx
const commonPropTypes = {
  title: string.isRequired, // Title of the Field
  description: string, // Optional description offering instructions
  name: string, // The input field name, values entered by user is stored as [name]: value
  type: string, // The field type
  defaultValue: any, // The default value the field should take
  required: bool, // Whether a value must be entered by the user
  placeholder: string, // Input placeholder text
  // a function called with the given user value as an input, return empty string if valid else else an err message
  validate: func, 
}
const commonDefaultProps = {
  description: '',
  refProp: null,
  type: 'text',
  defaultValue: null,
  name: '',
  required: false,
  placeholder: 'Type your answer here...',
  validate: () => '', 
}
```
### ShortTextField
```jsx
const additionalProps = {
  maxLength: number,
}
const defaultProps = {
  maxLength: 524288,
}
```
### NumberField
```jsx
const additionalProps = {
  min: number,
  max: number,
}
const defaultProps = {
  min: Number.MIN_VALUE,
  max: Number.MAX_VALUE,,
}
```
### DateField
```jsx
const additionalProps = {
  includeTime: bool,
}
const defaultProps = {
  includeTime: false,
}
```
### MultipleChoiceField
```jsx
const additionalProps = {
  options: arrayOf( string ).isRequired, // The possible options to pick from
  multiple: bool, // Whether the user can select multiple options
}
const defaultProps = {
  multiple: false, 
}
```

## License
MIT © [Sam-Ogden](https://github.com/Sam-Ogden)