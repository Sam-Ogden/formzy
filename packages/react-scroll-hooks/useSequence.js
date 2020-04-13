import { useState } from 'react';
var useSequence = function (length, activeIndex) {
    if (activeIndex === void 0) { activeIndex = 0; }
    var _a = useState(activeIndex), active = _a[0], setActive = _a[1];
    var next = function () {
        return setActive(function (currentActive) { return (currentActive === length - 1 ? currentActive : currentActive + 1); });
    };
    var previous = function () {
        return setActive(function (currentActive) { return (currentActive === 0 ? currentActive : currentActive - 1); });
    };
    var goToPosition = function (position) {
        return setActive(function (currentPosition) { return (position >= 0 && position < length ? position : currentPosition); });
    };
    return { next: next, previous: previous, goToPosition: goToPosition, active: active };
};
export { useSequence };
//# sourceMappingURL=useSequence.js.map