import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { GameScoreKeeperComponent } from './game-score-keeper.component';
import { GameScoreKeeperDetailComponent } from './game-score-keeper-detail.component';
import { GameScoreKeeperPopupComponent } from './game-score-keeper-dialog.component';
import { GameScoreKeeperDeletePopupComponent } from './game-score-keeper-delete-dialog.component';

import { Principal } from '../../shared';

export const gameRoute: Routes = [
    {
        path: 'game-score-keeper',
        component: GameScoreKeeperComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'scorekeeperApp.game.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'game-score-keeper/:id',
        component: GameScoreKeeperDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'scorekeeperApp.game.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gamePopupRoute: Routes = [
    {
        path: 'game-score-keeper-new',
        component: GameScoreKeeperPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'scorekeeperApp.game.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'game-score-keeper/:id/edit',
        component: GameScoreKeeperPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'scorekeeperApp.game.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'game-score-keeper/:id/delete',
        component: GameScoreKeeperDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'scorekeeperApp.game.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
