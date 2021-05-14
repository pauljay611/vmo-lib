import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../types';
import { qs } from '../utils';

const defaultUser = {
  bonus: 0,
  meta: {},
  rank: 0,
  score: 0,
  userInfo: {
    displayName: '',
    gloryroadMode: 0,
    level: 0,
    name: '',
    openID: '',
    picture: '36a80c61-89d9-40b5-803d-5b0437f293c4.jpg',
    region: 'TW',
    userID: '',
  },
};

const usersID = new Array(100).fill(0).map(() => uuidv4());

const createDefaultUser = (
  id: string,
  index: number,
  score: number = 1000,
) => ({
  ...defaultUser,
  score,
  rank: index + 1,
  userInfo: {
    ...defaultUser.userInfo,
    displayName: `user${index}`,
    name: `user${index}`,
    openID: `user${index}`,
    picture: '',
    userID: id,
  },
});

const mockUsers = usersID.map<User>((user, index) => createDefaultUser(user, index));

const createMockGiftedUsers = (
  count: number,
  limit: number,
): { userID: string; score: number }[] => {
  const giftedUsers = new Array(count).fill(0).map(() => {
    const randomUserIndex = Math.floor(limit * Math.random());
    const randomScore = Math.floor(10000 * Math.random());
    return {
      userID: usersID[randomUserIndex],
      score: randomScore,
    };
  });
  return giftedUsers;
};

const replaceLeaderboard = (curLeaderboard: User[], limit: number) => {
  const mockGiftedUsers = createMockGiftedUsers(1, limit);
  const nextLeaderboard = [...curLeaderboard];
  mockGiftedUsers.forEach((user) => {
    const curUser = nextLeaderboard.find(
      (u) => u.userInfo.userID === user.userID,
    );
    if (!curUser) {
      nextLeaderboard.push(
        createDefaultUser(user.userID, nextLeaderboard.length, user.score),
      );
    } else {
      curUser.score += user.score;
    }
  });
  return nextLeaderboard
    .sort((a, b) => b.score - a.score)
    .map((user, index) => ({ ...user, rank: index + 1 }));
};

export const useMockLeaderboard = (
  stable: boolean = false,
  limit: number = 100,
) => {
  const [leaderboard, setLeaderboard] = useState<User[]>([]);
  const [enable, setEnable] = useState('');
  const timer = useRef(0);
  const { test, initMockList } = qs<{ test: string; initMockList: string }>();

  useEffect(() => {
    if (initMockList) {
      setLeaderboard(mockUsers);
    }
    if (test) setEnable(test);
  }, [test, initMockList]);

  useEffect(() => {
    if (enable && stable) {
      setLeaderboard(mockUsers.slice(0, limit));
    }
    if (enable && !timer.current && !stable) {
      timer.current = window.setInterval(() => {
        setLeaderboard((prev) => replaceLeaderboard(prev, limit));
      }, 1000);
    }
    return () => {
      clearInterval(timer.current);
    };
  }, [enable, limit, stable]);

  return { leaderboard, enable } as const;
};

export default useMockLeaderboard;
