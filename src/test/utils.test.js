import { templateToTitle } from '..'

describe( 'templateToTitle', () => {
  const testParams = { fname: 'test1', lname: 'test2', mname: 'test3' }

  it( 'is exported by index.js', () => {
    expect( templateToTitle ).toBeTruthy()
  } )

  it( 'returns empty string given empty string', () => {
    expect( templateToTitle( '' ) ).toEqual( '' )
  } )

  it( 'returns the input string given string with no parameters', () => {
    const test = 'Test string'
    expect( templateToTitle( test ) ).toEqual( test )
  } )

  it( 'returns input string with params given string with single parameters', () => {
    const test = 'Test string {{_.fname}}'
    expect( templateToTitle( test, testParams ) ).toEqual( `Test string ${testParams.fname}` )
  } )

  it( 'returns input string with params given input with multiple parameters', () => {
    const test = 'Names: {{_.mname}}, {{_.fname}}{{_.lname}}'
    expect( templateToTitle( test, testParams ) ).toEqual(
      `Names: ${testParams.mname}, ${testParams.fname}${testParams.lname}`,
    )
  } )

  it( 'returns parameter value given a string that only has a paramter', () => {
    const test = '{{_.fname}}'
    expect( templateToTitle( test, testParams ) ).toEqual( testParams.fname )
  } )
} )

