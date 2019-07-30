import _ from 'lodash'

const valueIsEmpty = val => ( val === null || val === '' || val === [] )

/** Available validation methods */
export const validationMethods = {
  min: ( val, min ) => ( val < min ? `Value must be greater than or equal to ${min}` : '' ),
  max: ( val, max ) => ( val > max ? `Value must be less than or equal to ${max}` : '' ),
  minTextLength: ( val, minLen ) => ( val && val.length < minLen ? `Input length must be greater than ${minLen}` : '' ),
  maxTextLength: ( val, maxLen ) => ( val && val.length > maxLen ? `Input length must be less than ${maxLen}` : '' ),
  required: ( val, isRequired ) => ( isRequired && valueIsEmpty( val ) ? 'This is a required field' : '' ),
}

/**
 * Validate a value given array of required validation methods, validation values and optional
 * methods object (allowing for custom validation methods)
 * @param {any} value the value to validate
 * @param {Array} requirements arr of objects corresponding to required validationMethods
 * @param {Object} [methods = validationMethods] validation methods to use (optional)
 * @returns {Array} array of strings corresponding to the errors, or an empty array if no error
 * @example validateFromArray( 6, [ { min:0 },{ max:10 } ] )
 */
export const validateFromArray = ( value, requirements, methods = validationMethods ) => {
  const errors = []
  requirements.forEach( method => {
    const methodKey = _.keys( method )[ 0 ]
    const err = methods[ methodKey ]( value, method[ methodKey ] )
    if ( err !== '' ) errors.push( err )
  } )
  return errors
}

/**
 * Get the validationMethods requested in props as an array of keys
 * @param {Object} props object containing the validation props
 * @param {Object} [methods = validationMethods] validation methods to use (optional)
 * @returns {Array} arr of strs corresponding to required validation methods in validationMethods
 */
export const getValidationMethodsFromProps = (
  props, methods = validationMethods,
) => _.intersection(
  _.keys( props ), _.keys( methods ),
).map( key => ( { [ key ]: props[ key ] } ) )
