import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ScorekeeperSharedModule } from '../../shared';
import {
    GameScoreKeeperService,
    GameScoreKeeperPopupService,
    GameScoreKeeperComponent,
    GameScoreKeeperDetailComponent,
    GameScoreKeeperDialogComponent,
    GameScoreKeeperPopupComponent,
    GameScoreKeeperDeletePopupComponent,
    GameScoreKeeperDeleteDialogComponent,
    gameRoute,
    gamePopupRoute,
} from './';

const ENTITY_STATES = [
    ...gameRoute,
    ...gamePopupRoute,
];

@NgModule({
    imports: [
        ScorekeeperSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        GameScoreKeeperComponent,
        GameScoreKeeperDetailComponent,
        GameScoreKeeperDialogComponent,
        GameScoreKeeperDeleteDialogComponent,
        GameScoreKeeperPopupComponent,
        GameScoreKeeperDeletePopupComponent,
    ],
    entryComponents: [
        GameScoreKeeperComponent,
        GameScoreKeeperDialogComponent,
        GameScoreKeeperPopupComponent,
        GameScoreKeeperDeleteDialogComponent,
        GameScoreKeeperDeletePopupComponent,
    ],
    providers: [
        GameScoreKeeperService,
        GameScoreKeeperPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ScorekeeperGameScoreKeeperModule {}
