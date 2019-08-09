import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SubmitField from '../components/fields/SubmitField'

Enzyme.configure( { adapter: new Adapter() } )

describe( 'FormField Component', () => {
  it( 'is truthy', () => {
    expect( SubmitField ).toBeTruthy()
  } )
  test( 'renders', () => {
    const wrapper = shallow( <SubmitField name="aname" title="atitle" onSubmit={() => 1} /> )
    expect( wrapper.exists() ).toBe( true )
  } )
} )
