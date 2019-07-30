// validateFromArray
// getValidationMethodsFromProps

import _ from 'lodash'
import { validateFromArray, getValidationMethodsFromProps, validationMethods } from '../utils/validation'
/**
 * TODO
 * - Tests for each method in the default validationMethods object
 */

const mockProps = {
  min: 0,
  max: 10,
  nonRelatedProp: null,
}

const methods = {
  min: () => true,
  max: () => true,
}

describe( 'validation', () => {
  describe( 'getValidationMethodsFromProps', () => {
    test( 'returns an array of objects, each with 1 KV pair corresponding to a validation test',
      () => {
        const result = getValidationMethodsFromProps( mockProps, methods )
        expect( result ).toEqual( _.keys( methods ).map( k => ( { [ k ]: mockProps[ k ] } ) ) )
      } )

    test( 'no validation requirements in props returns empty array of validation tests',
      () => {
        const result = getValidationMethodsFromProps( {}, methods )
        expect( result.length ).toEqual( 0 )
      } )
  } )

  describe( 'validateFromArray', () => {
    test( 'returns empty array with valid input',
      () => {
        const validValue = 1
        const tests = getValidationMethodsFromProps( mockProps, methods )
        const result = validateFromArray( validValue, tests, validationMethods )
        expect( result.length ).toEqual( 0 )
      } )

    test( 'returns non-empty array with invalid input',
      () => {
        const invalidValue = -1
        const tests = getValidationMethodsFromProps( mockProps, methods )
        const result = validateFromArray( invalidValue, tests, validationMethods )
        expect( result.length ).toEqual( 1 )
      } )
  } )
} )
