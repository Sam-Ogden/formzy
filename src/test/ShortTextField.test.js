import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ShortTextField from '../components/fields/ShortTextField'

Enzyme.configure( { adapter: new Adapter() } )

describe( 'FormField Component', () => {
  it( 'is truthy', () => {
    expect( ShortTextField ).toBeTruthy()
  } )
  test( 'renders', () => {
    const wrapper = shallow( <ShortTextField name="aname" title="atitle" /> )
    expect( wrapper.exists() ).toBe( true )
  } )
} )
