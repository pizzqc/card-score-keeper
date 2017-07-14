import { BaseEntity } from './../../shared';

const enum GameType {
    'CARD',
    'DICE',
    'FREEFORM'
}

export class GameSessionScoreKeeper implements BaseEntity {
    constructor(
        public id?: number,
        public startDate?: any,
        public endDate?: any,
        public gameType?: GameType,
        public gameId?: number,
        public playerId?: number,
    ) {
    }
}
