import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import MultipleChoiceField from '../components/MultipleChoiceField'

Enzyme.configure( { adapter: new Adapter() } )

const OPTIONS = [ 'A', 'B', 'C' ]

describe( 'MultipleChoiceField Component', () => {
  it( 'is truthy', () => {
    expect( MultipleChoiceField ).toBeTruthy()
  } )
  test( 'renders', () => {
    const wrapper = shallow( <MultipleChoiceField name="field" title="field" options={OPTIONS} /> )
    expect( wrapper.exists() ).toBe( true )
  } )

  /**
   * Multiple prop is false
   * - options are rendered
   * - click on 'A' button adds value ['A'] to state
   * - click on 'A' button again removes 'A' from state
   * - click on 'A' then 'B' gives state ['B']
   */
  describe( 'when multiple prop is false', () => {
    test( 'all options are rendered', () => {
      const wrapper = mount( <MultipleChoiceField name="field" title="field" options={OPTIONS} /> )
      expect( wrapper.find( '.mcf-options-container button' ).length ).toBe( OPTIONS.length )
    } )

    test( 'value is received by HOC withFieldProps', () => {
      const hoc = shallow(
        <MultipleChoiceField name="field" title="field" options={OPTIONS} refProp={React.createRef( 0 )} />,
      )
      const child = mount( hoc.get( 0 ) )
      child.instance().onChange( { target: { value: 'A' } } )
      expect( child.state().selected ).toEqual( [ 'A' ] )
      expect( hoc.instance().state.value ).toEqual( [ 'A' ] )
    } )

    test( 'clicking an option updates state', () => {
      // Access the component of interest from within the HOC wrapper
      const hoc = shallow(
        <MultipleChoiceField name="field" title="field" options={OPTIONS} refProp={React.createRef( 0 )} />,
      )
      const child = mount( hoc.get( 0 ) )
      child.instance().onChange( { target: { value: 'A' } } )
      expect( child.state().selected ).toEqual( [ 'A' ] )
      expect( hoc.instance().state.value ).toEqual( [ 'A' ] )
    } )

    test( 'clicking the same option twice doesnt keeps the option in state', () => {
      const hoc = shallow(
        <MultipleChoiceField name="field" title="field" options={OPTIONS} refProp={React.createRef( 0 )} />,
      )
      const child = mount( hoc.get( 0 ) )
      child.instance().onChange( { target: { value: 'A' } } )
      child.instance().onChange( { target: { value: 'A' } } )
      expect( child.state().selected ).toEqual( [ 'A' ] )
      expect( hoc.instance().state.value ).toEqual( [ 'A' ] )
    } )

    test( 'clicking 2 options keeps the last option', () => {
      const hoc = shallow(
        <MultipleChoiceField name="field" title="field" options={OPTIONS} refProp={React.createRef( 0 )} />,
      )
      const child = mount( hoc.get( 0 ) )
      child.instance().onChange( { target: { value: 'A' } } )
      child.instance().onChange( { target: { value: 'B' } } )
      expect( child.state().selected ).toEqual( [ 'B' ] )
      expect( hoc.instance().state.value ).toEqual( [ 'B' ] )
    } )
  } )

  /**
   * Multiple prop is true
   * - options are rendered
   * - clicking 'A' then 'B' gives state ['A', 'B']
   * - clicking on 'A' again gives state ['B']
   */
  describe( 'when multiple prop is true', () => {
    test( 'all options are rendered', () => {
      const wrapper = mount( <MultipleChoiceField name="field" title="field" options={OPTIONS} multiple /> )
      expect( wrapper.find( '.mcf-options-container button' ).length ).toBe( OPTIONS.length )
    } )

    test( 'clicking an option updates state', () => {
      // Access the component of interest from within the HOC wrapper
      const hoc = shallow(
        <MultipleChoiceField name="field" title="field" options={OPTIONS} refProp={React.createRef( 0 )} multiple />,
      )
      const child = mount( hoc.get( 0 ) )
      child.instance().onChange( { target: { value: 'A' } } )
      expect( child.state().selected ).toEqual( [ 'A' ] )
    } )

    test( 'clicking option then again removes it from state', () => {
      const hoc = shallow(
        <MultipleChoiceField name="field" title="field" options={OPTIONS} refProp={React.createRef( 0 )} multiple />,
      )
      const child = mount( hoc.get( 0 ) )
      child.instance().onChange( { target: { value: 'A' } } )
      child.instance().onChange( { target: { value: 'A' } } )
      expect( child.state().selected ).toEqual( [ ] )
      expect( hoc.instance().state.value ).toEqual( [ ] )
    } )

    test( 'clicking 2 options keeps both', () => {
      const hoc = shallow(
        <MultipleChoiceField name="field" title="field" options={OPTIONS} refProp={React.createRef( 0 )} multiple />,
      )
      const child = mount( hoc.get( 0 ) )
      child.instance().onChange( { target: { value: 'A' } } )
      child.instance().onChange( { target: { value: 'B' } } )
      expect( child.state().selected ).toEqual( [ 'A', 'B' ] )
      expect( hoc.instance().state.value ).toEqual( [ 'A', 'B' ] )
    } )

    test( 'clicking 2 different options and then the first one again, removes the first value', () => {
      const hoc = shallow(
        <MultipleChoiceField name="field" title="field" options={OPTIONS} refProp={React.createRef( 0 )} multiple />,
      )
      const child = mount( hoc.get( 0 ) )

      child.instance().onChange( { target: { value: 'A' } } )
      child.instance().onChange( { target: { value: 'B' } } )
      child.instance().onChange( { target: { value: 'A' } } )

      expect( child.state().selected ).toEqual( [ 'B' ] )
      expect( hoc.instance().state.value ).toEqual( [ 'B' ] )
    } )
  } )
} )
