import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PlayerScoreKeeper } from './player-score-keeper.model';
import { PlayerScoreKeeperService } from './player-score-keeper.service';

@Injectable()
export class PlayerScoreKeeperPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private playerService: PlayerScoreKeeperService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.playerService.find(id).subscribe((player) => {
                this.playerModalRef(component, player);
            });
        } else {
            return this.playerModalRef(component, new PlayerScoreKeeper());
        }
    }

    playerModalRef(component: Component, player: PlayerScoreKeeper): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.player = player;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
