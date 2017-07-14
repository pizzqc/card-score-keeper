import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ScorekeeperSharedModule } from '../../shared';
import {
    GameSessionScoreKeeperService,
    GameSessionScoreKeeperPopupService,
    GameSessionScoreKeeperComponent,
    GameSessionScoreKeeperDetailComponent,
    GameSessionScoreKeeperDialogComponent,
    GameSessionScoreKeeperPopupComponent,
    GameSessionScoreKeeperDeletePopupComponent,
    GameSessionScoreKeeperDeleteDialogComponent,
    gameSessionRoute,
    gameSessionPopupRoute,
    GameSessionScoreKeeperResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...gameSessionRoute,
    ...gameSessionPopupRoute,
];

@NgModule({
    imports: [
        ScorekeeperSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        GameSessionScoreKeeperComponent,
        GameSessionScoreKeeperDetailComponent,
        GameSessionScoreKeeperDialogComponent,
        GameSessionScoreKeeperDeleteDialogComponent,
        GameSessionScoreKeeperPopupComponent,
        GameSessionScoreKeeperDeletePopupComponent,
    ],
    entryComponents: [
        GameSessionScoreKeeperComponent,
        GameSessionScoreKeeperDialogComponent,
        GameSessionScoreKeeperPopupComponent,
        GameSessionScoreKeeperDeleteDialogComponent,
        GameSessionScoreKeeperDeletePopupComponent,
    ],
    providers: [
        GameSessionScoreKeeperService,
        GameSessionScoreKeeperPopupService,
        GameSessionScoreKeeperResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ScorekeeperGameSessionScoreKeeperModule {}
