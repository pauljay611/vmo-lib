"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
const useTypeApi = (apiList = [], method = 'GET', realTime, eventoryAPI, initialData, opt = {
    limit: 1000,
    cursor: '',
}) => {
    const timeoutKey = react_1.useRef(0);
    const source = react_1.useRef();
    const [loading, setLoading] = react_1.useState(true);
    const [polling, setPolling] = react_1.useState(false);
    const [leaderboardData, setLeaderboardData] = react_1.useState(initialData);
    const getDataRealTimeAPI = react_1.useCallback((apis = [], time) => {
        timeoutKey.current = window.setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            setPolling(true);
            const apiArr = apis.map((api) => eventoryAPI({
                type: api,
                cancelToken: source.current.token,
                limit: opt.limit,
                cursor: opt.cursor,
                method,
            }));
            const results = yield Promise.all(apiArr);
            setLeaderboardData(results);
            setPolling(false);
        }), time);
    }, [method, opt.cursor, opt.limit]);
    react_1.useEffect(() => {
        setLoading(true);
        const promiseList = apiList.map((api) => eventoryAPI({
            type: api,
            cancelToken: source.current.token,
            limit: opt.limit,
            cursor: opt.cursor,
            method,
        }));
        source.current = axios_1.default.CancelToken.source();
        Promise.all(promiseList).then((results) => __awaiter(void 0, void 0, void 0, function* () {
            setLeaderboardData(results);
            setLoading(false);
        }));
        return () => {
            if (source.current)
                source.current.cancel();
            if (timeoutKey.current)
                clearTimeout(timeoutKey.current);
        };
    }, [apiList, method, opt.cursor, opt.limit]);
    react_1.useEffect(() => {
        if (!polling && realTime > 0) {
            clearTimeout(timeoutKey.current);
            timeoutKey.current = 0;
            getDataRealTimeAPI(apiList, realTime);
        }
    }, [polling, leaderboardData, apiList, realTime, getDataRealTimeAPI]);
    return { loading, leaderboardData };
};
exports.default = useTypeApi;
//# sourceMappingURL=api.js.map