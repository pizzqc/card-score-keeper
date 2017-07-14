import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PlayerScoreKeeperComponent } from './player-score-keeper.component';
import { PlayerScoreKeeperDetailComponent } from './player-score-keeper-detail.component';
import { PlayerScoreKeeperPopupComponent } from './player-score-keeper-dialog.component';
import { PlayerScoreKeeperDeletePopupComponent } from './player-score-keeper-delete-dialog.component';

import { Principal } from '../../shared';

export const playerRoute: Routes = [
    {
        path: 'player-score-keeper',
        component: PlayerScoreKeeperComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'scorekeeperApp.player.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'player-score-keeper/:id',
        component: PlayerScoreKeeperDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'scorekeeperApp.player.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const playerPopupRoute: Routes = [
    {
        path: 'player-score-keeper-new',
        component: PlayerScoreKeeperPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'scorekeeperApp.player.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'player-score-keeper/:id/edit',
        component: PlayerScoreKeeperPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'scorekeeperApp.player.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'player-score-keeper/:id/delete',
        component: PlayerScoreKeeperDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'scorekeeperApp.player.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
