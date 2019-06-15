import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { FormField } from '.'

Enzyme.configure( { adapter: new Adapter() } )

describe( 'FormField Component', () => {
  it( 'is truthy', () => {
    expect( FormField ).toBeTruthy()
  } )
  test( 'renders', () => {
    const wrapper = shallow( <FormField name="aname" title="atitle" /> )
    expect( wrapper.exists() ).toBe( true )
  } )
} )
