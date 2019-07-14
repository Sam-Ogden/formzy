import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NumberField from '../components/fields/NumberField'

Enzyme.configure( { adapter: new Adapter() } )

describe( 'FormField Component', () => {
  it( 'is truthy', () => {
    expect( NumberField ).toBeTruthy()
  } )
  test( 'renders', () => {
    const wrapper = shallow( <NumberField name="aname" title="atitle" /> )
    expect( wrapper.exists() ).toBe( true )
  } )

  test( 'inputing value updates state', () => {
    const wrapper = mount( <NumberField name="aname" title="atitle" /> )
    const input = wrapper.find( '.numberfield-input' )

    input.simulate( 'change', { target: { value: 1 } } )
    expect( wrapper.instance().state.value ).toEqual( 1 )
  } )

  test( 'pressing enter calls next method', () => {
    let test = 0
    const wrapper = mount( <NumberField name="aname" title="atitle" next={() => { test = 1 }} /> )
    const input = wrapper.find( '.numberfield-input' )

    // When enter key is pressed the next function prop should be called
    input.simulate( 'keyPress', { key: 'Enter' } )

    expect( test ).toEqual( 1 )
  } )
} )
