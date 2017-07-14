import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { GameSessionScoreKeeper } from './game-session-score-keeper.model';
import { GameSessionScoreKeeperService } from './game-session-score-keeper.service';

@Injectable()
export class GameSessionScoreKeeperPopupService {
    private isOpen = false;
    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private gameSessionService: GameSessionScoreKeeperService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.gameSessionService.find(id).subscribe((gameSession) => {
                gameSession.startDate = this.datePipe
                    .transform(gameSession.startDate, 'yyyy-MM-ddThh:mm');
                gameSession.endDate = this.datePipe
                    .transform(gameSession.endDate, 'yyyy-MM-ddThh:mm');
                this.gameSessionModalRef(component, gameSession);
            });
        } else {
            return this.gameSessionModalRef(component, new GameSessionScoreKeeper());
        }
    }

    gameSessionModalRef(component: Component, gameSession: GameSessionScoreKeeper): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.gameSession = gameSession;
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
