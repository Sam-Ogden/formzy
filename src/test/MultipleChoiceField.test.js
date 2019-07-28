import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import MultipleChoiceField from '../components/fields/MultipleChoiceField'

Enzyme.configure( { adapter: new Adapter() } )

const OPTIONS = [ 'A', 'B', 'C' ]

const MCFWithPassingValidation = (
  <MultipleChoiceField
    name="field"
    title="title"
    options={OPTIONS}
    onChange={( name, value ) => ( { name, value } )}
    next={() => 1}
    validate={() => ''} // validation passes when string is empty
    refProp={React.createRef( 0 )}
    defaultValue={[ 'A' ]}
  />
)

describe( 'MultipleChoiceField Component', () => {
  it( 'is truthy', () => {
    expect( MultipleChoiceField ).toBeTruthy()
  } )
  test( 'renders', () => {
    const wrapper = shallow( MCFWithPassingValidation )
    expect( wrapper.exists() ).toBe( true )
  } )

  test( 'defaultValue is saved', () => {
    const hoc = shallow( MCFWithPassingValidation )
    expect( hoc.instance().state.value ).toEqual( [ 'A' ] )
  } )

  test( 'inputChange method updates state to value', () => {
    const newValue = 'newvalue'
    const hoc = shallow( MCFWithPassingValidation )
    hoc.instance().inputChange( newValue )
    expect( hoc.instance().state.value ).toEqual( newValue )
  } )

  /**
   * Next function is provided by the Higher Order Component in
   * ../components/hocs/withFieldPropsAndFieldTransition
  */
  describe( 'next function with passing validation', () => {
    test( 'onChange prop function is called and returns correct value', () => {
      const hoc = shallow( MCFWithPassingValidation )
      const child = mount( hoc.get( 0 ) )
      child.instance().onChange( { target: { value: 'A' } } )
      expect( hoc.instance().next() ).toEqual( true )
    } )
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
      const wrapper = mount( MCFWithPassingValidation )
      expect( wrapper.find( '.mcf-options-container button' ).length ).toBe( OPTIONS.length )
    } )

    test( 'value is received by HOC withFieldPropsAndFieldTransition', () => {
      const hoc = shallow( MCFWithPassingValidation )
      const child = mount( hoc.get( 0 ) )
      child.instance().onChange( { target: { value: 'A' } } )
      expect( child.state().selected ).toEqual( [ 'A' ] )
      expect( hoc.instance().state.value ).toEqual( [ 'A' ] )
    } )

    test( 'clicking an option updates state', () => {
      // Access the component of interest from within the HOC wrapper
      const hoc = shallow( MCFWithPassingValidation )
      const child = mount( hoc.get( 0 ) )
      child.instance().onChange( { target: { value: 'A' } } )
      expect( child.state().selected ).toEqual( [ 'A' ] )
      expect( hoc.instance().state.value ).toEqual( [ 'A' ] )
    } )

    test( 'clicking the same option twice doesnt keeps the option in state', () => {
      const hoc = shallow( MCFWithPassingValidation )
      const child = mount( hoc.get( 0 ) )
      child.instance().onChange( { target: { value: 'A' } } )
      child.instance().onChange( { target: { value: 'A' } } )
      expect( child.state().selected ).toEqual( [ 'A' ] )
      expect( hoc.instance().state.value ).toEqual( [ 'A' ] )
    } )

    test( 'clicking 2 options keeps the last option', () => {
      const hoc = shallow( MCFWithPassingValidation )
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
      const wrapper = mount( React.cloneElement( MCFWithPassingValidation, { multiple: true } ) )
      expect( wrapper.find( '.mcf-options-container button' ).length ).toBe( OPTIONS.length )
    } )

    test( 'clicking an option updates state', () => {
      // Access the component of interest from within the HOC wrapper
      const hoc = shallow( React.cloneElement( MCFWithPassingValidation, { multiple: true } ) )
      const child = mount( hoc.get( 0 ) )
      child.instance().onChange( { target: { value: 'A' } } )
      expect( child.state().selected ).toEqual( [ 'A' ] )
    } )

    test( 'clicking option then again removes it from state', () => {
      const hoc = shallow( React.cloneElement( MCFWithPassingValidation, { multiple: true } ) )
      const child = mount( hoc.get( 0 ) )
      child.instance().onChange( { target: { value: 'A' } } )
      child.instance().onChange( { target: { value: 'A' } } )
      expect( child.state().selected ).toEqual( [ ] )
      expect( hoc.instance().state.value ).toEqual( [ ] )
    } )

    test( 'clicking 2 options keeps both', () => {
      const hoc = shallow( React.cloneElement( MCFWithPassingValidation, { multiple: true } ) )
      const child = mount( hoc.get( 0 ) )
      child.instance().onChange( { target: { value: 'A' } } )
      child.instance().onChange( { target: { value: 'B' } } )
      expect( child.state().selected ).toEqual( [ 'A', 'B' ] )
      expect( hoc.instance().state.value ).toEqual( [ 'A', 'B' ] )
    } )

    test( 'clicking 2 different options and then the first one again, removes the first value', () => {
      const hoc = shallow( React.cloneElement( MCFWithPassingValidation, { multiple: true } ) )
      const child = mount( hoc.get( 0 ) )

      child.instance().onChange( { target: { value: 'A' } } )
      child.instance().onChange( { target: { value: 'B' } } )
      child.instance().onChange( { target: { value: 'A' } } )

      expect( child.state().selected ).toEqual( [ 'B' ] )
      expect( hoc.instance().state.value ).toEqual( [ 'B' ] )
    } )
  } )
} )
