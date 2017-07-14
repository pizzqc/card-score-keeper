import { BaseEntity } from './../../shared';

export class PlayerScoreKeeper implements BaseEntity {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public phoneNumber?: string,
    ) {
    }
}
