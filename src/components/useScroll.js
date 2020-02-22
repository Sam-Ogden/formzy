import { Children, useState, useRef, useEffect } from 'react'
import zenscroll from 'zenscroll'

/**
 * Returns array of objects to apply to each child respectivly
 * Each child will receive the following props
 * - next: function to scroll to the next child. Calls onEnd prop when there is no next child
 * - prev: function to scroll to previous child,
 * - containerRef: ref to apply to the container of child. This is centered on the screen.
 * - focusRef: ref to apply to an element that should receive focus when scrolling to that child
 * - index: the index of the child in the scroll order
 * - isActive: true if this child is the active child
 */
function useScroll(
  children, scrollDuration = 777, edgeOffset = 10, onChange = noop, onEnd = noop,
) {
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
      const newIndex = onEnd()
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

  return Children.map( children, ( _, index ) => {
    const [ containerRef, focusRef ] = createRefs()
    return {
      next,
      prev,
      focusRef,
      containerRef,
      index,
      isActive: current === index,
    }
  } )
}

const noop = () => undefined

export default useScroll
