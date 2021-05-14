import { User } from '../types';
export declare const useMockLeaderboard: (stable?: boolean, limit?: number) => {
    readonly leaderboard: User[];
    readonly enable: string;
};
export default useMockLeaderboard;
