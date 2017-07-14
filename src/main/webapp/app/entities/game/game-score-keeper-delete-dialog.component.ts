import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { GameScoreKeeper } from './game-score-keeper.model';
import { GameScoreKeeperPopupService } from './game-score-keeper-popup.service';
import { GameScoreKeeperService } from './game-score-keeper.service';

@Component({
    selector: 'jhi-game-score-keeper-delete-dialog',
    templateUrl: './game-score-keeper-delete-dialog.component.html'
})
export class GameScoreKeeperDeleteDialogComponent {

    game: GameScoreKeeper;

    constructor(
        private gameService: GameScoreKeeperService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gameService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'gameListModification',
                content: 'Deleted an game'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-game-score-keeper-delete-popup',
    template: ''
})
export class GameScoreKeeperDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private gamePopupService: GameScoreKeeperPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.gamePopupService
                .open(GameScoreKeeperDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
