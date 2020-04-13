import { MutableRefObject } from 'react';
declare type Props = {
    initialActive?: number;
    verticalOffset?: number;
    scrollSpeed?: number;
    containerRef?: MutableRefObject<HTMLElement>;
};
declare const useScrollSequence: (options?: Props) => {
    createScrollRef: () => {
        ref: MutableRefObject<HTMLElement | undefined>;
        index: number;
    };
    next: () => void;
    previous: () => void;
    goToPosition: (position: number) => void;
    active: number;
};
export { useScrollSequence };
