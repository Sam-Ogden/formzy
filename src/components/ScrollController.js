import React, { Children, useState, useRef, useEffect } from 'react'
import { func, number, oneOfType, node } from 'prop-types'
import zenscroll from 'zenscroll'
import { KEY_DOWN, KEY_UP } from 'keycode-js'

/**
 * Helps controll scrolling between children elements by passing props down
 * Each child receives the following props
 * - next: function to scroll to the next child. Calls onFinalNext prop when there is no next child
 * - prev: function to scroll to previous child,
 * - containerRef: ref to apply to the container of child. This is centered on the screen.
 * - focusRef: ref to apply to an element that should receive focus when scrolling to that child
 * - index: the index of the child in the scroll order
 * - isActive: true if this child is the active child
 */
function ScrollController( props ) {
  const { onChange, children, scrollDuration, edgeOffset, onFinalNext, onKeyUp } = props
  const [ current, setCurrent ] = useState( 0 )

  const containerRefs = []
  const focusRefs = []
  let timeouts = []

  useEffect( () => {
    window.noZensmooth = true
    zenscroll.setup( scrollDuration, edgeOffset )
    scrollToRef( containerRefs[ current ], focusRefs[ current ] )
  }, [] )

  const killScrolling = () => {
    zenscroll.stop()
    timeouts.forEach( id => clearTimeout( id ) )
    timeouts = []
  }

  const scrollToRef = ( containerRef, focusRef ) => {
    killScrolling()
    const { defaultDuration } = zenscroll.setup()
    zenscroll.to( containerRef.current, null )
    if ( focusRef.current ) {
      timeouts.push( setTimeout( () => { focusRef.current.focus() }, defaultDuration ) )
    }
  }

  const next = () => {
    let newIndex = current
    if ( current < containerRefs.length - 1 ) {
      newIndex = current + 1
      setCurrent( newIndex )
      scrollToRef( containerRefs[ newIndex ], focusRefs[ newIndex ] )
      onChange( newIndex )
    } else {
      const newIndex = onFinalNext()
      if (
        Number.isInteger( newIndex )
        && newIndex > 0
        && newIndex < Children.count( children ) - 1
      ) {
        setCurrent( newIndex )
        scrollToRef( containerRefs[ newIndex ], focusRefs[ newIndex ] )
        onChange( newIndex )
      }
    }
  }

  const prev = () => {
    const newIndex = current > 0 ? current - 1 : 0
    setCurrent( newIndex )
    scrollToRef( containerRefs[ newIndex ], focusRefs[ newIndex ] )
    onChange( newIndex )
  }

  const createRefs = () => {
    const containerRef = useRef( null )
    const focusRef = useRef( null )
    containerRefs.push( containerRef )
    focusRefs.push( focusRef )
    return [ containerRef, focusRef ]
  }

  const handleKeyUp = event => {
    if ( onKeyUp ) onKeyUp( event )
    else {
      switch ( event.keyCode ) {
        case KEY_DOWN:
          next()
          event.preventDefault()
          break
        case KEY_UP:
          prev()
          event.preventDefault()
          break
        default:
      }
    }
  }

  return (
    <div role="presentation" onKeyUp={handleKeyUp}>
      {
        Children.map( children, ( Child, index ) => {
          const [ containerRef, focusRef ] = createRefs()
          return (
            <div onFocus={() => setCurrent( index )}>
              {
                React.cloneElement( Child, {
                  next,
                  prev,
                  focusRef,
                  containerRef,
                  index,
                  isActive: current === index,
                } )
              }
            </div>
          )
        } )
      }
    </div>
  )
}

const noop = () => undefined

ScrollController.propTypes = {
  /**
   * @external zenscroll
   * When scrolling, this amount of distance is kept from the edges of the container
   */
  edgeOffset: number,
  /**
   * Function to call when the current active child changes
   */
  onChange: func,
  /**
   * Function to call when next is called on the last child
   * @return {Integer} index to scroll to e.g. if a form field has validation errors
   */
  onFinalNext: func,
  /**
   * Function to call when key up is fired on the scroll container
   * This prevents default handler being fired
   * @param {Event} event the event object
   */
  onKeyUp: func,
  children: oneOfType( [ func, node ] ).isRequired,
  /**
   * @external zenscroll
   * Duration of the scroll animation
   */
  scrollDuration: number,
}

ScrollController.defaultProps = {
  onChange: noop,
  onFinalNext: noop,
  onKeyUp: undefined,
  edgeOffset: 10,
  scrollDuration: 777,
}

export default ScrollController
