import React from 'react';
import { User } from '../types';
interface ItemStyle {
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
}
interface Props {
    user: User[];
    rowCount: number;
    itemStyle: ItemStyle;
}
declare const TransitionLeaderboardWrapper: React.FC<Props>;
export default TransitionLeaderboardWrapper;
