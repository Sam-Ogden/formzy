// validate
// getValidationMethodsFromProps

import _ from 'lodash'
import { validate, validationChecksFromProps, defaultValidationMethods } from '../utils/validation'
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
  min: defaultValidationMethods.min,
  max: defaultValidationMethods.max,
}

describe( 'validation', () => {
  describe( 'validationChecksFromProps', () => {
    test( 'returns object with correct checks',
      () => {
        const result = validationChecksFromProps( mockProps, methods )
        expect( result ).toEqual(
          {
            min: { func: methods.min, test: mockProps.min },
            max: { func: methods.max, test: mockProps.max },
          },
        )
      } )

    test( 'no validation requirements in props returns empty array of validation tests',
      () => {
        const result = validationChecksFromProps( {}, methods )
        expect( result ).toEqual( {} )
      } )
  } )

  describe( 'validate method', () => {
    test( 'returns empty array with valid input',
      () => {
        const validValue = 1
        const tests = validationChecksFromProps( mockProps, methods )
        const result = validate( validValue, tests, {} )
        expect( result.length ).toEqual( 0 )
      } )

    test( 'returns non-empty array with invalid input',
      () => {
        const invalidValue = -1
        const tests = validationChecksFromProps( mockProps, methods )
        const result = validate( invalidValue, tests )
        expect( result.length ).toEqual( 1 )
      } )
  } )
} )
