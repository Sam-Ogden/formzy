import _ from 'lodash'

const valueIsEmpty = val => ( val === null || val === '' || val === [] )

/** Available validation methods */
export const defaultValidationMethods = {
  min: ( val, min ) => ( val < min ? `Value must be greater than or equal to ${min}` : '' ),
  max: ( val, max ) => ( val > max ? `Value must be less than or equal to ${max}` : '' ),
  minTextLength: ( val, minLen ) => ( val && val.length < minLen ? `Input length must be greater than ${minLen}` : '' ),
  maxTextLength: ( val, maxLen ) => ( val && val.length > maxLen ? `Input length must be less than ${maxLen}` : '' ),
  required: ( val, isRequired ) => ( isRequired && valueIsEmpty( val ) ? 'This is a required field' : '' ),
}

/**
 * Validate a value given obj of required validation checks
 * @param {any} value the value to validate
 * @param {Object} checks checks to perform. format { check: { func: <func>, test: <testValue> }, }
 * @param {Object} props component props
 * @returns {Array} array of strings corresponding to the errors, or an empty array if no error
 * @example validate( 6, [ { min:0 },{ max:10 } ] )
 */
export const validate = ( value, checks, props ) => {
  const errors = []

  _.forEach( checks, ( { func, test } ) => {
    const err = func( value, test, props )
    if ( err !== '' ) errors.push( err )
  } )

  return errors
}

/**
 * Get the validationMethods requested in props as an array of keys
 * customValidation is attached to allow fields to have custom validation checks without exposing it
 * in their props
 * @param {Object} props object containing the validation props
 * @param {Object} methods validation methods to use (optional)
 * @returns {Object} object of checks e.g. { min: { func: methods.min, test: 0 }, max: {...} }
 */
export const validationChecksFromProps = (
  props, methods = defaultValidationMethods,
) => {
  const checks = {}
  const keys = _.intersection( _.keys( props ), _.keys( methods ) )
  keys.forEach( k => {
    checks[ k ] = { func: methods[ k ], test: props[ k ] }
  } )
  return checks
}
