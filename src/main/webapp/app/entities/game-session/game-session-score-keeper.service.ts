import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { GameSessionScoreKeeper } from './game-session-score-keeper.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class GameSessionScoreKeeperService {

    private resourceUrl = 'api/game-sessions';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(gameSession: GameSessionScoreKeeper): Observable<GameSessionScoreKeeper> {
        const copy = this.convert(gameSession);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(gameSession: GameSessionScoreKeeper): Observable<GameSessionScoreKeeper> {
        const copy = this.convert(gameSession);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<GameSessionScoreKeeper> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        entity.startDate = this.dateUtils
            .convertDateTimeFromServer(entity.startDate);
        entity.endDate = this.dateUtils
            .convertDateTimeFromServer(entity.endDate);
    }

    private convert(gameSession: GameSessionScoreKeeper): GameSessionScoreKeeper {
        const copy: GameSessionScoreKeeper = Object.assign({}, gameSession);

        copy.startDate = this.dateUtils.toDate(gameSession.startDate);

        copy.endDate = this.dateUtils.toDate(gameSession.endDate);
        return copy;
    }
}
