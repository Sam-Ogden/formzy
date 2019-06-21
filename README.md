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
import React, { Component } from 'react'

import { FormContainer, ShortTextField, NumberField, DateField } from 'react-formtype'

class Example extends Component {
  render () {
    return (
      <FormContainer 
        showProgress={true} 
        onSubmit={formData => {...}} 
        submitTitle="Thanks!" 
        submitButtonText="Send form"
      >
        <ShortTextField title="What is your name?" name="name" required />
        <NumberField title="How many oranges would you like?" name="noranges" min={0} max={10} />
        <DataField title="When were you born?" name="dob" />
      </FormContainer>
    )
  }
}
```
## License

MIT © [Sam-Ogden](https://github.com/Sam-Ogden)
