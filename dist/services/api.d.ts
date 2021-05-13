import { CancelToken } from 'axios';
import { User } from '../types';
export interface APIType {
    sta: string;
    prod: string;
    isCache?: boolean;
    isVote?: boolean;
    isEventory?: boolean;
    firstRender?: boolean;
    needBonus?: boolean;
}
export interface EventoryParams {
    type: {
        sta: string;
        prod: string;
    };
    cancelToken: CancelToken;
    limit: number;
    cursor: string;
    method: string;
    callBack?: (data: any) => void;
}
declare const useTypeApi: (apiList: APIType[] | undefined, method: string | undefined, realTime: number, eventoryAPI: (params: EventoryParams) => Promise<User[]>, initialData?: any, opt?: {
    limit: number;
    cursor: string;
}) => {
    loading: boolean;
    leaderboardData: any;
};
export default useTypeApi;
