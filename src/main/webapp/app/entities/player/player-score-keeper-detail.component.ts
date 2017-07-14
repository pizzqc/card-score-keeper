import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { PlayerScoreKeeper } from './player-score-keeper.model';
import { PlayerScoreKeeperService } from './player-score-keeper.service';

@Component({
    selector: 'jhi-player-score-keeper-detail',
    templateUrl: './player-score-keeper-detail.component.html'
})
export class PlayerScoreKeeperDetailComponent implements OnInit, OnDestroy {

    player: PlayerScoreKeeper;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private playerService: PlayerScoreKeeperService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPlayers();
    }

    load(id) {
        this.playerService.find(id).subscribe((player) => {
            this.player = player;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPlayers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'playerListModification',
            (response) => this.load(this.player.id)
        );
    }
}
