import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { FormContainer } from '.'

Enzyme.configure( { adapter: new Adapter() } )

describe( 'FormContainer Component', () => {
  it( 'is truthy', () => {
    expect( FormContainer ).toBeTruthy()
  } )
  test( 'renders', () => {
    const wrapper = shallow( <FormContainer fields={[]} onSubmit={() => {}} /> )
    expect( wrapper.exists() ).toBe( true )
  } )

  test( 'state updates on change', () => {
    const wrapper = shallow( <FormContainer fields={[]} onSubmit={() => {}} /> )

    wrapper.instance().onChange( 'akey', 'X' )
    wrapper.instance().onChange( 'bkey', 'Z' )

    expect( wrapper.state().form.akey ).toEqual( 'X' )
    expect( wrapper.state().form.bkey ).toEqual( 'Z' )
  } )

  test( 'submit button returns state to parent component', () => {
    const wrapper = shallow( <FormContainer fields={[]} onSubmit={form => form} /> )
    wrapper.instance().onChange( 'akey', 'X' )
    expect( wrapper.instance().submit() ).toEqual( { akey: 'X' } )
  } )
} )
