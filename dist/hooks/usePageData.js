"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePageData = void 0;
const dad_1 = require("@17media/dad");
const useMergeLeaderboardData_1 = require("./useMergeLeaderboardData");
const useCountdown_1 = require("./useCountdown");
const useAutoNext_1 = require("./useAutoNext");
const useMockLeaderboard_1 = require("./useMockLeaderboard");
const usePageData = ({ apiList, startDate, endDate, nextPage, isResultPage, endedText, }) => {
    const { data, bonus, blackList, } = apiList;
    const mergedLeaderboardData = useMergeLeaderboardData_1.useMergeLeaderboardData({
        data,
        bonus,
        blackList,
    });
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const { status, text } = useCountdown_1.useCountdown(start, end, endedText);
    const isEnded = status === useCountdown_1.TimeStatus.Ended && dad_1.now() < end + 5000;
    useAutoNext_1.useAutoNext(isEnded, nextPage);
    const { enable, leaderboard: mockLeaderboard } = useMockLeaderboard_1.useMockLeaderboard(isResultPage);
    const leaderboard = enable ? mockLeaderboard : mergedLeaderboardData;
    return {
        leaderboard,
        text,
    };
};
exports.usePageData = usePageData;
exports.default = exports.usePageData;
//# sourceMappingURL=usePageData.js.map