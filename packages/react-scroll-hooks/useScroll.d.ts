import { MutableRefObject } from 'react';
export declare const useScroll: (options?: {
    scrollSpeed?: number | undefined;
    containerRef?: MutableRefObject<HTMLElement> | undefined;
}) => {
    scrollToY: (y: number) => void;
    scrollToElement: (element: MutableRefObject<HTMLElement>, verticalOffset?: number) => void;
};
