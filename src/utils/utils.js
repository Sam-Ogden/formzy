import { templateSettings, template } from 'lodash'

/**
* Converts a template string into a title with the values inserted into it
* Parameters should be enclosed in double curly braces in the template string
* Example:
*   templateToTitle( 'Hi {{_.fname}} {{_.lname}}!', { fname: 'Jim', lname: 'Carrey' } )
*   returns 'Hi Jim Carrey!'
* Accessing nested values in the params input is not possible (i.e. you can NOT do {{_.date.day}} )
* @param {Stirng} str the parameterised string
* @param {Object} params values to use in place of parameters
* @param {String} placeholder replaces null values with this string in template
* @returns {String} str with values inserted into placeholders
*/
export const templateToTitle = ( str, params, placeholder = '_ _ _ _ _' ) => {
  templateSettings.interpolate = /{{([\s\S]+?)}}/g
  const fieldNames = str.match( /({{_.).+?(?=}})/g ) || []

  const paramsWithPlaceholder = params

  // Replace value for fields that have no value yet with placeholder string
  fieldNames.forEach( dirtyName => {
    // Drop the {{_. appendix of the parameter name
    // Required for browser compatability (regexp lookbehind not available)
    const name = dirtyName.slice( '{{_.'.length )

    paramsWithPlaceholder[ name ] = params[ name ] || placeholder
  } )

  return template( str, { variable: '_' } )( paramsWithPlaceholder )
}
