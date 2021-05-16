import React from 'react';
import { usePageData } from '../lib/hooks/usePageData';

const round1 = {
  startDate: '2021-05-01T18:55:00+08:00',
  endDate: '2021-06-01T18:55:00+08:00',
  nextPage: 2,
  isResultPage: false,
  endedText: '活動結束',
};

const OfflineRound = () => {
  const { mockLeaderboard, countdownText } = usePageData(round1);
  return (
    <div>
      <span>{countdownText}</span>
      {mockLeaderboard.map((item) => (
        <div>
          {item.userInfo.openID}
          :
          {' '}
          {item.score}
        </div>
      ))}
    </div>
  );
};

export default OfflineRound;
