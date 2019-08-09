import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Field from '../components/fields/Field'

Enzyme.configure( { adapter: new Adapter() } )

/**
 * - when none empty description is given, description is shown
 * - when a child prop is given it is displayed
 * - when a next function is given, next button is displayed
 * - next button can be clicked and executes successfully
 * - if no next function is given then no next button is shown
 * - if there is a validation error then a error box is shown
 * - if there is no validation error then no error box is shown
 * - title is displayed
 */

describe( 'Field Component', () => {
  it( 'is truthy', () => {
    expect( Field ).toBeTruthy()
  } )

  test( 'title is displayed', () => {
    const field = mount( <Field title="title"><b /></Field> )
    expect( field.find( '.field .title' ).length ).toEqual( 1 )
  } )

  test( 'description shown when description prop given', () => {
    const field = mount( <Field description="none-empty" title="title"><b /></Field> )
    expect( field.find( '.field .desc' ).length ).toEqual( 1 )
  } )

  test( 'no description shown with empty description prop', () => {
    const field = mount( <Field description="" title="title"><b /></Field> )
    expect( field.find( '.field .desc' ).length ).toEqual( 0 )
  } )

  test( 'when a child prop is given it is displayed', () => {
    const field = mount( <Field description="" title="title"><b className="x" /></Field> )
    expect( field.children.length ).toEqual( 1 )
  } )

  test( 'when a next function is given, next button is displayed', () => {
    const field = mount( <Field next={() => 1} title="title"><b /></Field> )
    expect( field.find( '.field .next-button' ).length ).toEqual( 1 )
  } )

  test( 'error box is shown with invalid input', () => {
    const field = mount( <Field title="title" err={[ 'error' ]}><b /></Field> )
    expect( field.find( '.field .validation-error' ).length ).toEqual( 1 )
  } )

  test( 'no error box is shown with valid input', () => {
    const field = mount( <Field title="title"><b /></Field> )
    expect( field.find( '.field .validation-error' ).length ).toEqual( 0 )
  } )
} )
