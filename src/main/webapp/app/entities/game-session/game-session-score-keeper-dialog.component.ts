import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { GameSessionScoreKeeper } from './game-session-score-keeper.model';
import { GameSessionScoreKeeperPopupService } from './game-session-score-keeper-popup.service';
import { GameSessionScoreKeeperService } from './game-session-score-keeper.service';
import { GameScoreKeeper, GameScoreKeeperService } from '../game';
import { PlayerScoreKeeper, PlayerScoreKeeperService } from '../player';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-game-session-score-keeper-dialog',
    templateUrl: './game-session-score-keeper-dialog.component.html'
})
export class GameSessionScoreKeeperDialogComponent implements OnInit {

    gameSession: GameSessionScoreKeeper;
    authorities: any[];
    isSaving: boolean;

    games: GameScoreKeeper[];

    players: PlayerScoreKeeper[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private gameSessionService: GameSessionScoreKeeperService,
        private gameService: GameScoreKeeperService,
        private playerService: PlayerScoreKeeperService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.gameService
            .query({filter: 'gamesession-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.gameSession.gameId) {
                    this.games = res.json;
                } else {
                    this.gameService
                        .find(this.gameSession.gameId)
                        .subscribe((subRes: GameScoreKeeper) => {
                            this.games = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.playerService.query()
            .subscribe((res: ResponseWrapper) => { this.players = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.gameSession.id !== undefined) {
            this.subscribeToSaveResponse(
                this.gameSessionService.update(this.gameSession));
        } else {
            this.subscribeToSaveResponse(
                this.gameSessionService.create(this.gameSession));
        }
    }

    private subscribeToSaveResponse(result: Observable<GameSessionScoreKeeper>) {
        result.subscribe((res: GameSessionScoreKeeper) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: GameSessionScoreKeeper) {
        this.eventManager.broadcast({ name: 'gameSessionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackGameById(index: number, item: GameScoreKeeper) {
        return item.id;
    }

    trackPlayerById(index: number, item: PlayerScoreKeeper) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-game-session-score-keeper-popup',
    template: ''
})
export class GameSessionScoreKeeperPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private gameSessionPopupService: GameSessionScoreKeeperPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.gameSessionPopupService
                    .open(GameSessionScoreKeeperDialogComponent, params['id']);
            } else {
                this.modalRef = this.gameSessionPopupService
                    .open(GameSessionScoreKeeperDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
