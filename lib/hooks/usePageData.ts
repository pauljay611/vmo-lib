import { now } from '@17media/dad';

import useTypeApi, { APIType, EventoryParams } from '../services/api';

import useMergeLeaderboardData from './useMergeLeaderboardData';

import useCountdown, { TimeStatus } from './useCountdown';

import useAutoNext from './useAutoNext';

import useMockLeaderboard from './useMockLeaderboard';
import { User } from '../types';

interface PageContext {
  apiList: APIType[];
  startDate: string;
  endDate: string;
  nextPage: number;
  endedText: string;
  isResultPage: boolean;
  eventoryAPI: (params: EventoryParams)=> Promise<User[]>,
}

const usePageData = ({
  apiList,
  startDate,
  endDate,
  nextPage,
  isResultPage,
  endedText,
  eventoryAPI,
}: PageContext) => {
  const { loading, leaderboardData = [] } = useTypeApi(
    apiList,
    'GET',
    1000,
    eventoryAPI,
    [],
  );
  const [data, bonus, blackList] = leaderboardData;

  const mergedLeaderboardData = useMergeLeaderboardData({
    data,
    bonus,
    blackList,
  });

  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const { status, text } = useCountdown(start, end, endedText);
  const isEnded = status === TimeStatus.Ended && now() < end + 5000;

  useAutoNext(isEnded, nextPage);

  const { enable, leaderboard: mockLeaderboard } = useMockLeaderboard(isResultPage);

  const leaderboard = enable ? mockLeaderboard : mergedLeaderboardData;

  return {
    leaderboard,
    loading,
    text,
  };
};

export default usePageData;
