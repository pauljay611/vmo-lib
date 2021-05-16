import { now } from '@17media/dad';

import useCountdown, { TimeStatus } from './useCountdown';

import useAutoNext from './useAutoNext';

import useMockLeaderboard from './useMockLeaderboard';

export interface PageContext {
  startDate: string;
  endDate: string;
  nextPage: number;
  endedText: string;
  isResultPage: boolean;
}

export const usePageData = ({
  startDate,
  endDate,
  nextPage,
  isResultPage,
  endedText,
}: PageContext) => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const { status, text: countdownText } = useCountdown(start, end, endedText);
  const isEnded = status === TimeStatus.Ended && now() < end + 5000;

  useAutoNext(isEnded, nextPage);

  const { enable, leaderboard: mockLeaderboard } = useMockLeaderboard(isResultPage);

  return {
    mockLeaderboard,
    test: enable,
    countdownText,
    status,
  };
};

export default usePageData;
