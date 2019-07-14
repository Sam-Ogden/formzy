import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import DateField from '../components/fields/DateField'

Enzyme.configure( { adapter: new Adapter() } )

/**
 * Default value prop shows in value in state
 * Changing the fields changes the state
 * validation passes then state is returned
 * validation fails then string is returned
 * if includeTime prop is true then time field is visible
 */

const dateFieldWithTime = (
  <DateField
    name="field"
    title="title"
    onChange={( name, value ) => ( { name, value } )}
    next={() => 1}
    validate={() => ''} // validation passes when string is empty
    refProp={React.createRef( 0 )}
    defaultValue={{ day: 1, month: 2, year: 2000 }}
    includeTime
  />
)

describe( 'DateField Component', () => {
  it( 'is truthy', () => {
    expect( DateField ).toBeTruthy()
  } )

  test( 'with includeTime prop false shows 3 fields (day/month/year)', () => {
    const dateField = mount( React.cloneElement( dateFieldWithTime, { includeTime: false } ) )
    expect( dateField.find( '.datefield-time' ).length ).toEqual( 0 )
  } )

  test( 'with includeTime prop true shows 4 fields (day/month/year/time)', () => {
    const dateField = mount( dateFieldWithTime )
    expect( dateField.find( '.datefield-time' ).length ).toEqual( 1 )
  } )

  test( 'updating day/month/year/time input fields updates state', () => {
    const dateField = mount( dateFieldWithTime )
    const dayinput = dateField.find( '.datefield-day' )
    const monthinput = dateField.find( '.datefield-month' )
    const yearinput = dateField.find( '.datefield-year' )
    const timeinput = dateField.find( '.datefield-time' )

    dayinput.simulate( 'change', { target: { name: 'day', value: 1 } } )
    monthinput.simulate( 'change', { target: { name: 'month', value: 2 } } )
    yearinput.simulate( 'change', { target: { name: 'year', value: 2000 } } )
    timeinput.simulate( 'change', { target: { name: 'time', value: 0 } } )

    expect( dateField.instance().state.value ).toEqual( { day: 1, month: 2, year: 2000, time: 0 } )
  } )
} )

