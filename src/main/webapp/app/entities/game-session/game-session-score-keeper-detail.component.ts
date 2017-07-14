import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { GameSessionScoreKeeper } from './game-session-score-keeper.model';
import { GameSessionScoreKeeperService } from './game-session-score-keeper.service';

@Component({
    selector: 'jhi-game-session-score-keeper-detail',
    templateUrl: './game-session-score-keeper-detail.component.html'
})
export class GameSessionScoreKeeperDetailComponent implements OnInit, OnDestroy {

    gameSession: GameSessionScoreKeeper;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private gameSessionService: GameSessionScoreKeeperService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInGameSessions();
    }

    load(id) {
        this.gameSessionService.find(id).subscribe((gameSession) => {
            this.gameSession = gameSession;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGameSessions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'gameSessionListModification',
            (response) => this.load(this.gameSession.id)
        );
    }
}
