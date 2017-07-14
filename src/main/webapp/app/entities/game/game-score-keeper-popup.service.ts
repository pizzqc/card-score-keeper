import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GameScoreKeeper } from './game-score-keeper.model';
import { GameScoreKeeperService } from './game-score-keeper.service';

@Injectable()
export class GameScoreKeeperPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private gameService: GameScoreKeeperService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.gameService.find(id).subscribe((game) => {
                this.gameModalRef(component, game);
            });
        } else {
            return this.gameModalRef(component, new GameScoreKeeper());
        }
    }

    gameModalRef(component: Component, game: GameScoreKeeper): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.game = game;
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
