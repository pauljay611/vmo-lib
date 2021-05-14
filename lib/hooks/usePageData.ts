import { now } from '@17media/dad';

import { useMergeLeaderboardData } from './useMergeLeaderboardData';

import { TimeStatus, useCountdown } from './useCountdown';

import { useAutoNext } from './useAutoNext';

import { useMockLeaderboard } from './useMockLeaderboard';
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

export const usePageData = ({
  apiList,
  startDate,
  endDate,
  nextPage,
  isResultPage,
  endedText,
}: PageContext) => {
  const {
    data,
    bonus,
    blackList,
  } = apiList;

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
    text,
  };
};

export default usePageData;
