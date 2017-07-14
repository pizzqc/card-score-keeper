import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PlayerScoreKeeper } from './player-score-keeper.model';
import { PlayerScoreKeeperPopupService } from './player-score-keeper-popup.service';
import { PlayerScoreKeeperService } from './player-score-keeper.service';

@Component({
    selector: 'jhi-player-score-keeper-delete-dialog',
    templateUrl: './player-score-keeper-delete-dialog.component.html'
})
export class PlayerScoreKeeperDeleteDialogComponent {

    player: PlayerScoreKeeper;

    constructor(
        private playerService: PlayerScoreKeeperService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.playerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'playerListModification',
                content: 'Deleted an player'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-player-score-keeper-delete-popup',
    template: ''
})
export class PlayerScoreKeeperDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private playerPopupService: PlayerScoreKeeperPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.playerPopupService
                .open(PlayerScoreKeeperDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
