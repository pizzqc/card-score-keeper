import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { GameSessionScoreKeeper } from './game-session-score-keeper.model';
import { GameSessionScoreKeeperPopupService } from './game-session-score-keeper-popup.service';
import { GameSessionScoreKeeperService } from './game-session-score-keeper.service';

@Component({
    selector: 'jhi-game-session-score-keeper-delete-dialog',
    templateUrl: './game-session-score-keeper-delete-dialog.component.html'
})
export class GameSessionScoreKeeperDeleteDialogComponent {

    gameSession: GameSessionScoreKeeper;

    constructor(
        private gameSessionService: GameSessionScoreKeeperService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gameSessionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'gameSessionListModification',
                content: 'Deleted an gameSession'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-game-session-score-keeper-delete-popup',
    template: ''
})
export class GameSessionScoreKeeperDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private gameSessionPopupService: GameSessionScoreKeeperPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.gameSessionPopupService
                .open(GameSessionScoreKeeperDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
