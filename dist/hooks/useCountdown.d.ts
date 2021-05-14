export declare enum TimeStatus {
    NotYet = 0,
    Ongoing = 1,
    Ended = 2
}
export interface TimeCount {
    d: number;
    h: number;
    m: number;
    s: number;
    ms: number;
}
export declare const useCountdown: (start: number, end: number, timeEndText: string) => {
    status: TimeStatus;
    text: string;
};
export default useCountdown;
