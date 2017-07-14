import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ScorekeeperPlayerScoreKeeperModule } from './player/player-score-keeper.module';
import { ScorekeeperGameScoreKeeperModule } from './game/game-score-keeper.module';
import { ScorekeeperGameSessionScoreKeeperModule } from './game-session/game-session-score-keeper.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ScorekeeperPlayerScoreKeeperModule,
        ScorekeeperGameScoreKeeperModule,
        ScorekeeperGameSessionScoreKeeperModule
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ScorekeeperEntityModule {}
