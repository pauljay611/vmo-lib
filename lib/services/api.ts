import {
  useState, useEffect, useRef, useCallback,
} from 'react';
import axios, { CancelTokenSource, CancelToken } from 'axios';
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
    },
    cancelToken: CancelToken,
    limit: number,
    cursor: string,
    method:string,
    callBack?: (data: any)=>void,
}

const useTypeApi = (
  apiList: APIType[] = [],
  method = 'GET',
  realTime: number,
  eventoryAPI: (params: EventoryParams)=> Promise<User[]>,
  initialData?: any,
  opt = {
    limit: 1000,
    cursor: '',
  },
) => {
  const timeoutKey = useRef(0);
  const source = useRef<CancelTokenSource>();
  const [loading, setLoading] = useState(true);
  const [polling, setPolling] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState(initialData);

  const getDataRealTimeAPI = useCallback(
    (apis:APIType[] = [], time) => {
      timeoutKey.current = window.setTimeout(async () => {
        setPolling(true);
        const apiArr: Promise<User[]>[] = apis.map((api) => eventoryAPI(
          {
            type: api,
            cancelToken: source.current!.token,
            limit: opt.limit,
            cursor: opt.cursor,
            method,
          },
        ));
        const results = await Promise.all(apiArr);
        setLeaderboardData(results);
        setPolling(false);
      }, time);
    },
    [method, opt.cursor, opt.limit],
  );
  useEffect(() => {
    setLoading(true);
    const promiseList: Promise<User[]>[] = apiList.map((api) => eventoryAPI(
      {
        type: api,
        cancelToken: source.current!.token,
        limit: opt.limit,
        cursor: opt.cursor,
        method,
      },
    ));
    source.current = axios.CancelToken.source();
    Promise.all(promiseList).then(async (results: any) => {
      setLeaderboardData(results);
      setLoading(false);
    });

    return () => {
      if (source.current) source.current.cancel();
      if (timeoutKey.current) clearTimeout(timeoutKey.current);
    };
  }, [apiList, method, opt.cursor, opt.limit]);
  useEffect(() => {
    if (!polling && realTime > 0) {
      clearTimeout(timeoutKey.current);
      timeoutKey.current = 0;
      getDataRealTimeAPI(apiList, realTime);
    }
  }, [polling, leaderboardData, apiList, realTime, getDataRealTimeAPI]);

  return { loading, leaderboardData };
};

export default useTypeApi;
