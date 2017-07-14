import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ScorekeeperSharedModule } from '../../shared';
import {
    PlayerScoreKeeperService,
    PlayerScoreKeeperPopupService,
    PlayerScoreKeeperComponent,
    PlayerScoreKeeperDetailComponent,
    PlayerScoreKeeperDialogComponent,
    PlayerScoreKeeperPopupComponent,
    PlayerScoreKeeperDeletePopupComponent,
    PlayerScoreKeeperDeleteDialogComponent,
    playerRoute,
    playerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...playerRoute,
    ...playerPopupRoute,
];

@NgModule({
    imports: [
        ScorekeeperSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PlayerScoreKeeperComponent,
        PlayerScoreKeeperDetailComponent,
        PlayerScoreKeeperDialogComponent,
        PlayerScoreKeeperDeleteDialogComponent,
        PlayerScoreKeeperPopupComponent,
        PlayerScoreKeeperDeletePopupComponent,
    ],
    entryComponents: [
        PlayerScoreKeeperComponent,
        PlayerScoreKeeperDialogComponent,
        PlayerScoreKeeperPopupComponent,
        PlayerScoreKeeperDeleteDialogComponent,
        PlayerScoreKeeperDeletePopupComponent,
    ],
    providers: [
        PlayerScoreKeeperService,
        PlayerScoreKeeperPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ScorekeeperPlayerScoreKeeperModule {}
