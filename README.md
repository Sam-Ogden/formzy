# react-formtype
>
[![NPM](https://img.shields.io/npm/v/react-form.svg)](https://www.npmjs.com/package/react-formtype) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-airbnb-brightgreen.svg)](https://github.com/airbnb/javascript)

✏️ React library alternative for building TypeForm style forms.


## [See an example here](https://sam-ogden.github.io/react-formtype/).

![](example.gif)

## Usage

```jsx
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

```
Fields should have unique ```name``` props as values are stored in the FormContainer as {fieldName: value} pairs. And will be passed to the onSubmit method this way.

Assuming a value is given for each field in the above example, when the user hits submit, the submit method will receive:  

```data = { name: ..., fruits: [...], noranges: ..., orangedate: { day: ..., month: ..., year: ... } }```  

## Referencing User Inputs In Titles
Field titles can reference previous user inputs in the titles of other fields. This is achieved by:
* using ```{{_.FIELD_NAME}}``` in the title prop.

## Components
[FormContainer](#FormContainer)

[ShortTextField](#ShortTextField)

[NumberField](#NumberField)

[DateField](#DateField)

[MultipleChoiceField](#MultipleChoiceField)

[InformationField](#InformationField)


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
}
const commonDefaultProps = {
  description: '',
  inputRef: null,
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
  maxTextLength: number,
  minTextLength: number,
}
const defaultProps = {
  maxTextLength: 524288,
  minTextLength: 0,
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
  options: arrayOf( string ).isRequired,
  multiple: bool, // Whether the user can select multiple options
}
const defaultProps = {
  multiple: false, 
}
```

### InformationField
This field is used to display information to the user, e.g. a welcome screen. 


## Custom Fields
Fields can be created using the withValidationAndTransition higher order component and the ```<Field />``` component which are both exported by react-formtype. 

### The ```<Field />``` Component
This is the default way to display the field components, it displays the title, description, validation errors and the next button. See ```src/components/fields/NumberField.js``` for example usage in the render method.
```jsx
Field.propTypes = {
  children: instanceOf( Object ).isRequired, // The input element
  title: string.isRequired, // The title of the field
  description: string, // Description for additional instructions
  next: func, // The function to call to scroll to the next field
  err: arrayOf( string ), // Any errors in the input given by a user
}

Field.defaultProps = {
  description: '',
  next: null,
  err: [],
}
```
You can create your own Field component for use with your own fields. (Future feature: ability to pass in custom Field component to FormContainer so you can reuse all the premade fields with your own UI structure for the title/description/next buttons/errors).

### The withValidationAndTransition HOC
This component adds shared functionality to all field components. 
* It provides validation checking and modifications
* Registering validation errors with the parent component (FormContainer)
* Passing the input value up to the parent component for centralised management of the form state. 
* Handles when a field can transition to the next section after a user clicks the next button or hits enter. 

### Validation For Custom Fields
Fields wrapped with the HOC come with default validation methods and usage is determined by the props passed when a form is created, e.g. if a form field is passed a ```min={5}``` prop, then the min function will be used during validation and tests the input value with the test value of 5. These default methods can be found in ```/src/utils/validation.js```

Custom validation methods specific to a field component can be created. 
When a custom validation method is called it is passed 3 arguments:
* ```value``` the value input by a user
* ```test``` the value to test against (e.g. min would test if value >= test)
* ```props``` the field component props. This allows validation methods to use prop values inside it

The HOC passes 2 functions to the wrapped field component to allow custom validation for a specific field: 
* ```addValidationChecks(checks)``` adds checks to be made each time an input is validated. This can be custom validation that is specific to your field component. The checks input should have the following structure ```{ min: {func: <function>, test: <value>}, max: {func: <function>, test: <value> } }``` where ```func``` is the method to run and ```test``` is the value to check against. 
* ```updateValidationChecks(methods)``` allows you to update a method being used in the defaultValidationMethods in ```/src/utils/validation.js``` for example the required check may be more complex than just seeing if an value is null/empty string/empty array. E.g. with DateField we must check that {day, month, year} are all given. ```methods``` should look like ```{ methodName: <function>, methodName: <function> }```. E.g. To override the default ```required``` method call ```updateValidationChecks({required: newRequiredFunc })``` inside the field component onComponentDidMount method. 

By using the above methods you can customise the validation for your own field components that are wrapped with the withValidationAndTransition HOC.


## License
MIT © [Sam-Ogden](https://github.com/Sam-Ogden)
