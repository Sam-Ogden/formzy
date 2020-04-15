# Scrolling
**Cross-browser scroll hooks** to manage scrolling between react elements.

## Features
- **Cross Browser**
- **Scroll Inside Container**
- **Scroll Entire Document**
- **Simple Hook Based API**
- **Efficient**

## Hooks
- **useScroll**: A hook to manage the scrolling between elements.
- **useScrollSequence**: Includes ref management on top of `useScroll`. Use the `createScrollRef` function returned by the hook to quickly attach refs to a sequence of elements, then use `next`, `previous` and `goToPosition` methods to scroll between them.


# useScroll Hook
The `useScroll` hook can be used to scroll an entire document or within a container.

## Usage 

```javascript
import { useScroll } from 'react-scroll-hooks';

const Component = () => {
    const containerRef = React.useRef();
    const elementRef = React.useRef();
    const scrollSpeed = 50;

    const { scrollToElement, scrollToY } = useScroll({ scrollSpeed, containerRef })

    return (
        <div ref={containerRef} style={{ position: 'relative', overflow: 'scroll' }}>
            <button onClick={() => scrollToElement(elementRef)}
            ...
            <p ref={elementRef}></p>
        </div>
    )
}
```

**Note**: The container in which scrolling occurs requires the following CSS properties to work as expected:
```css
position: relative;
overflow: scroll;
```  
## Props  
The hook takes an **object** as a parameter with the following properties:  

| Parameter    | Type   | Default                  | Description                                                                            |
|--------------|--------|--------------------------|----------------------------------------------------------------------------------------|
| scrollSpeed  | number | 40                       | The speed at which scrolling occurs                                                    |
| containerRef | Ref    | document.documentElement | A ref to the container.  If a ref is not provided then it scrolls the entire document. |

## Returns

| Property        | Type                                                                      | Description                                                                                                                                     |
|-----------------|---------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| scrollToElement | (ref: MutableRefObject<.HTMLElement>, verticalOffset: number) => undefined | Use this method to scroll to an element with a given ref leaving `verticalOffset` pixels between element and the top of the container/document. |
| scrollToY       | (y: number) => undefined                                                  | Use this method to scroll to a `y` position in the container/document.                                                                          |

You can destructure these properties as follows:  
```javascript
const { scrollToElement, scrollToY } = useScroll();
```


# useScrollSequence Hook
The `useScrollSequence` hook can be used to scroll through a sequence of elements using methods such as `next` and `previous`.
You can scroll within a container or the entire document.
## Usage 

```javascript
import { useScrollSequence } from 'react-scroll-hooks';

const Component = () => {
    const containerRef = React.useRef();

    const { createScrollRef, next, previous, goToPosition, active } = useScrollSequence({
        initialActive: 2,
        verticalOffset: 100,
        scrollSpeed: 50,
        containerRef
    });

    return (
        <div ref={containerRef} style={{ position: 'relative', overflow: 'scroll' }}>
            <button onClick={() => next()}>next</button>
            <button onClick={() => previous()}>previous</button>
            <button onClick={() => goToPosition(2)}>Go To Position 2</button>
            ...
            <p {...createScrollRef()}>Position 0</p>
            <p {...createScrollRef()}>Position 1</p>
            <p {...createScrollRef()}>Position 2</p>
        </div>
    )
}
```
**Note**: The container in which scrolling occurs requires the following CSS properties to work as expected:
```css
position: relative;
overflow: scroll;
```  
## Props  
The hook takes an **object** as a parameter with the following properties:  

| Parameter      | Type   | Default                  | Description                                                                               |
|----------------|--------|--------------------------|-------------------------------------------------------------------------------------------|
| initialActive  | number | -1                       | The index of the initial active element. This will scroll to the element on first render. |
| verticalOffset | number | 0                        | The space between the top of the container/document and the element being scrolled to.    |
| scrollSpeed    | number | 40                       | The speed at which scrolling occurs.                                                      |
| containerRef   | Ref    | document.documentElement | A ref to the container. If a ref is not provided then it scrolls the entire document.     |
## Returns

| Property        | Type                                                      | Description                                                                                               |
|-----------------|-----------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| createScrollRef | () => {ref: MutableRefObject<.HTMLElement>, index: number} | This method returns a ref to attach to an element. And the index the element will be in the scroll order. |
| next            | () => undefined                                           | Scrolls to the next element in the sequence.                                                              |
| previous        | () => undefined                                           | Scrolls to the previous element in the sequence.                                                          |
| goToPosition    | (index: number) => undefined                              | Scrolls to the element at the given index in the sequence.                                                |
| active          | number                                                    | The index of the currently active element.                                                                |
You can destructure these properties as follows:  
```javascript
const { createScrollRef, next, previous, goToPosition, active } = useScrollSequence();
```