var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { useLayoutEffect, useRef, useState } from 'react';
import { useSequence, useScroll } from '.';
var useScrollSequence = function (options) {
    if (options === void 0) { options = {}; }
    var _a = options.initialActive, initialActive = _a === void 0 ? -1 : _a, _b = options.verticalOffset, verticalOffset = _b === void 0 ? 0 : _b, _c = options.scrollSpeed, scrollSpeed = _c === void 0 ? 40 : _c, containerRef = options.containerRef;
    var _d = useState(0), length = _d[0], setLength = _d[1];
    var scrollToElement = useScroll({ scrollSpeed: scrollSpeed, containerRef: containerRef || undefined }).scrollToElement;
    var _e = useSequence(length, initialActive), next = _e.next, previous = _e.previous, goToPosition = _e.goToPosition, active = _e.active;
    var scrollRefs = [];
    var createScrollRef = function () {
        var scrollRef = useRef();
        scrollRefs = __spreadArrays(scrollRefs, [scrollRef]);
        return { ref: scrollRef, index: scrollRefs.length - 1 };
    };
    useLayoutEffect(function () {
        if (scrollRefs[initialActive])
            scrollToElement(scrollRefs[initialActive], verticalOffset);
        setLength(scrollRefs.length);
    }, []);
    useLayoutEffect(function () {
        if (scrollRefs[active])
            scrollToElement(scrollRefs[active], verticalOffset);
    }, [active]);
    return { createScrollRef: createScrollRef, next: next, previous: previous, goToPosition: goToPosition, active: active };
};
export { useScrollSequence };
//# sourceMappingURL=useScrollSequence.js.map