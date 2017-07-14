import { BaseEntity } from './../../shared';

export class GameScoreKeeper implements BaseEntity {
    constructor(
        public id?: number,
        public gameName?: string,
    ) {
    }
}
