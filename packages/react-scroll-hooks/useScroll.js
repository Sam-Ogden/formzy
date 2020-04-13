import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import warning from 'warning';
var cancelAllAnimationFrames = function (frames) {
    frames.forEach(function (frame) { return window.cancelAnimationFrame(frame); });
};
var getScrollTop = function (ref) { return ref.current.scrollTop; };
var getScrollHeight = function (ref) { return ref.current.scrollHeight; };
var getClientHeight = function (ref) { return ref.current.clientHeight; };
var atBottomOfContainer = function (containerRef) {
    return getScrollTop(containerRef) + getClientHeight(containerRef) === getScrollHeight(containerRef);
};
export var useScroll = function (options) {
    if (options === void 0) { options = {}; }
    var _a = options.scrollSpeed, scrollSpeed = _a === void 0 ? 40 : _a, _b = options.containerRef, containerRef = _b === void 0 ? { current: document.documentElement } : _b;
    var animationFrames = useRef([]);
    var lastScrollPosition = useRef(0);
    var isScrollingUp = useRef(false);
    var isScrollingDown = useRef(false);
    var _c = useState(-1), y = _c[0], setY = _c[1];
    var cancelScrolling = function () {
        cancelAllAnimationFrames(animationFrames.current);
        animationFrames.current = [];
        isScrollingUp.current = false;
        isScrollingDown.current = false;
    };
    var userDidScrollInOppositeDirection = function () {
        if (isScrollingUp.current && getScrollTop(containerRef) > lastScrollPosition.current) {
            return true;
        }
        else if (isScrollingDown.current && getScrollTop(containerRef) < lastScrollPosition.current) {
            return true;
        }
        return false;
    };
    var performScroll = function (y) {
        cancelScrolling();
        lastScrollPosition.current = getScrollTop(containerRef);
        animationFrames.current.push(window.requestAnimationFrame(function step() {
            var scrollTop = getScrollTop(containerRef);
            var difference = y - scrollTop;
            if (Math.abs(difference) < 1) {
                cancelScrolling();
                return;
            }
            else if (difference < 0) {
                isScrollingUp.current = true;
                var delta = Math.abs(difference) < scrollSpeed ? difference : -scrollSpeed;
                containerRef.current.scrollTop = getScrollTop(containerRef) + delta;
                return animationFrames.current.push(window.requestAnimationFrame(step));
            }
            else if (difference > 0) {
                if (atBottomOfContainer(containerRef)) {
                    cancelScrolling();
                    return;
                }
                isScrollingDown.current = true;
                var delta = Math.abs(difference) < scrollSpeed ? difference : scrollSpeed;
                containerRef.current.scrollTop = getScrollTop(containerRef) + delta;
                return animationFrames.current.push(window.requestAnimationFrame(step));
            }
        }));
    };
    useEffect(function () {
        var isScrollingDocument = containerRef.current === document.documentElement;
        if (process.env.NODE_ENV !== 'production') {
            warning(containerRef.current.style.position || isScrollingDocument, 'Scrolling may behave unexpectedly if the containerRef does not have a css position set on it.');
            warning(containerRef.current.style.overflow === 'scroll' || isScrollingDocument, 'Expected containerRef to have css property overflow set to `scroll`. Without this property scrolling may not work.');
        }
    }, []);
    useEffect(function () {
        containerRef.current.addEventListener('scroll', function () {
            if (userDidScrollInOppositeDirection())
                cancelScrolling();
            lastScrollPosition.current = getScrollTop(containerRef);
            setY(-1);
        });
    }, []);
    useLayoutEffect(function () {
        if (y >= 0) {
            performScroll(y);
        }
    }, [y]);
    var scrollToY = function (y) { return setY(y < 0 ? 0 : y); };
    var scrollToElement = function (element, verticalOffset) {
        if (verticalOffset === void 0) { verticalOffset = 0; }
        var elementOffsetTop = element.current.offsetTop;
        scrollToY(elementOffsetTop - verticalOffset);
    };
    return { scrollToY: scrollToY, scrollToElement: scrollToElement };
};
//# sourceMappingURL=useScroll.js.map