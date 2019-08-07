import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import FormContainer from '../components/FormContainer'

Enzyme.configure( { adapter: new Adapter() } )

describe( 'FormContainer Component', () => {
  it( 'is truthy', () => {
    expect( FormContainer ).toBeTruthy()
  } )
  test( 'renders', () => {
    const wrapper = shallow(
      <FormContainer onSubmit={() => {}}>
        <p />
      </FormContainer>,
    )
    expect( wrapper.exists() ).toBe( true )
  } )

  test( 'state updates on change', () => {
    const wrapper = shallow(
      <FormContainer onSubmit={() => {}}>
        <p />
      </FormContainer>,
    )
    wrapper.instance().onChange( 'akey', 'X' )
    wrapper.instance().onChange( 'bkey', 'Z' )

    expect( wrapper.state().form.akey ).toEqual( 'X' )
    expect( wrapper.state().form.bkey ).toEqual( 'Z' )
  } )

  test( 'submit calls onSubmit with form data when there are no validation errors', () => {
    let receivedData = {}
    const onSubmit = form => {
      receivedData = form
      return true
    }

    const wrapper = shallow(
      <FormContainer onSubmit={onSubmit}>
        <p />
      </FormContainer>,
    )
    wrapper.instance().onChange( 'akey', 'X' )
    wrapper.instance().submit()
    expect( receivedData ).toEqual( { akey: 'X' } )
  } )

  describe( 'submission validation process', () => {
    test( 'submissionErrors are saved to state after calling registerValidationError then submit method',
      () => {
        const wrapper = shallow(
          <FormContainer onSubmit={form => form}>
            <p />
          </FormContainer>,
        )
        const fieldIndex = 0
        const errors = [ 'error1', 'error2' ]
        wrapper.instance().registerValidationError( fieldIndex, errors )

        const result = wrapper.instance().submit()

        expect( result ).toEqual( false )
        expect( wrapper.instance().errors[ fieldIndex ] ).toEqual( errors )
        expect( wrapper.instance().state.submissionErrors[ fieldIndex ] ).toEqual( errors )
      } )

    /*
    * After submitting form with errors and then updating input to fix them,
    * we want errors to be removed from state to remove them from the view
    * This prevents errors sticking around when they are being updated by user
    */
    test( 'submissionErrors are removed from state when registerValidationError is called following submit',
      () => {
        const wrapper = shallow(
          <FormContainer onSubmit={form => form}>
            <p />
          </FormContainer>,
        )
        const fieldIndex = 0
        const errors = [ 'error1', 'error2' ]
        wrapper.instance().registerValidationError( fieldIndex, errors )
        wrapper.instance().submit()
        const newError = [ 'new error' ]
        wrapper.instance().registerValidationError( fieldIndex, newError )

        // new errors are registered into this.errors and old errors removed from state
        expect( wrapper.instance().errors[ fieldIndex ] ).toEqual( newError )
        expect( wrapper.instance().state.submissionErrors[ fieldIndex ].length ).toEqual( 0 )
      } )

    test(
      'when onSubmit returns errors, these errors are saved to submissionErrors and submit returns false',
      () => {
        const error = [ 'err' ]
        const wrapper = shallow(
          <FormContainer onSubmit={() => ( { testField: error } )}>
            <p name="testField" />
          </FormContainer>,
        )

        const result = wrapper.instance().submit()

        // errors return by callback onSubmit are registered in state
        expect( result ).toEqual( false )
        expect( wrapper.instance().state.submissionErrors.testField ).toEqual( error )
      },
    )

    test( 'when onSubmit returns success, submit returns true', () => {
      const wrapper = shallow(
        <FormContainer onSubmit={() => true}>
          <p />
        </FormContainer>,
      )

      wrapper.instance().onChange( 'testField', 'random value' )
      const result = wrapper.instance().submit()

      // submit returns true
      expect( result ).toEqual( true )
      expect( wrapper.instance().state.submissionErrors ).toEqual( {} )
    } )

    test( 'doesnt break when onSubmit returns nothing', () => {
      const wrapper = shallow(
        <FormContainer onSubmit={() => {}}>
          <p />
        </FormContainer>,
      )
      wrapper.instance().submit()
    } )
  } )
} )
