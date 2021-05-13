import { APIType, EventoryParams } from '../services/api';
import { User } from '../types';
interface PageContext {
    apiList: APIType[];
    startDate: string;
    endDate: string;
    nextPage: number;
    endedText: string;
    isResultPage: boolean;
    eventoryAPI: (params: EventoryParams) => Promise<User[]>;
}
declare const usePageData: ({ apiList, startDate, endDate, nextPage, isResultPage, endedText, eventoryAPI, }: PageContext) => {
    leaderboard: User[];
    loading: boolean;
    text: string;
};
export default usePageData;
