import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { GameSessionScoreKeeperComponent } from './game-session-score-keeper.component';
import { GameSessionScoreKeeperDetailComponent } from './game-session-score-keeper-detail.component';
import { GameSessionScoreKeeperPopupComponent } from './game-session-score-keeper-dialog.component';
import { GameSessionScoreKeeperDeletePopupComponent } from './game-session-score-keeper-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class GameSessionScoreKeeperResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const gameSessionRoute: Routes = [
    {
        path: 'game-session-score-keeper',
        component: GameSessionScoreKeeperComponent,
        resolve: {
            'pagingParams': GameSessionScoreKeeperResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'scorekeeperApp.gameSession.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'game-session-score-keeper/:id',
        component: GameSessionScoreKeeperDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'scorekeeperApp.gameSession.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gameSessionPopupRoute: Routes = [
    {
        path: 'game-session-score-keeper-new',
        component: GameSessionScoreKeeperPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'scorekeeperApp.gameSession.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'game-session-score-keeper/:id/edit',
        component: GameSessionScoreKeeperPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'scorekeeperApp.gameSession.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'game-session-score-keeper/:id/delete',
        component: GameSessionScoreKeeperDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'scorekeeperApp.gameSession.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
