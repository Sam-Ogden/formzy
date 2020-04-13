export interface UseSequenceReturnType {
    next: () => void;
    previous: () => void;
    goToPosition: (position: number) => void;
    active: number;
}
declare type useSequenceType = (length: number, activeIndex?: number) => UseSequenceReturnType;
declare const useSequence: useSequenceType;
export { useSequence };
