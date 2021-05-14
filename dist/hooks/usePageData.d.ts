import { User } from '../types';
export interface APIList {
    data: User[];
    bonus: User[];
    blackList: User[];
}
export interface PageContext {
    apiList: APIList;
    startDate: string;
    endDate: string;
    nextPage: number;
    endedText: string;
    isResultPage: boolean;
}
declare const usePageData: ({ apiList, startDate, endDate, nextPage, isResultPage, endedText, }: PageContext) => {
    leaderboard: User[];
    text: string;
};
export default usePageData;
