/// <reference types="react" />
declare const _default: {
    hooks: {
        useAutoNext: (isEnded: boolean, page: number) => void;
        useCountdown: (start: number, end: number, timeEndText: string) => {
            status: import("./hooks").TimeStatus;
            text: string;
        };
        useItemTransition: (itemStyle: import("./hooks").ItemStyle, transition: import("./hooks").TransitionStyle, rowItems: number, currentRank: number | number[]) => {
            itemTransitionStyle: {
                transition: string;
                left: number;
                top: number;
            };
        } | {
            itemTransitionStyle: {
                transition: string;
                left: number;
                top: number;
            }[];
        };
        useMergeLeaderboardData: ({ data, bonus, blackList, }: import("./hooks").LeaderboardDataList) => {
            bonus: number;
            meta: Record<string, number>;
            rank: number;
            score: number;
            userInfo: {
                displayName: string;
                gloryroadMode: number;
                level: number;
                name: string;
                openID: string;
                picture: string;
                region: string;
                userID: string;
            };
        }[];
        useMockLeaderboard: (stable?: boolean, limit?: number) => {
            readonly leaderboard: import("./types").User[];
            readonly enable: string;
        };
        usePageData: ({ apiList, startDate, endDate, nextPage, isResultPage, endedText, }: import("./hooks").PageContext) => {
            leaderboard: import("./types").User[];
            text: string;
        };
    };
    components: {
        TransitionLeaderboardWrapper: import("react").FC<import("./components").Props>;
    };
};
export default _default;