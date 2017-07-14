/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ScorekeeperTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { GameSessionScoreKeeperDetailComponent } from '../../../../../../main/webapp/app/entities/game-session/game-session-score-keeper-detail.component';
import { GameSessionScoreKeeperService } from '../../../../../../main/webapp/app/entities/game-session/game-session-score-keeper.service';
import { GameSessionScoreKeeper } from '../../../../../../main/webapp/app/entities/game-session/game-session-score-keeper.model';

describe('Component Tests', () => {

    describe('GameSessionScoreKeeper Management Detail Component', () => {
        let comp: GameSessionScoreKeeperDetailComponent;
        let fixture: ComponentFixture<GameSessionScoreKeeperDetailComponent>;
        let service: GameSessionScoreKeeperService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ScorekeeperTestModule],
                declarations: [GameSessionScoreKeeperDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    GameSessionScoreKeeperService,
                    JhiEventManager
                ]
            }).overrideTemplate(GameSessionScoreKeeperDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GameSessionScoreKeeperDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GameSessionScoreKeeperService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new GameSessionScoreKeeper(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.gameSession).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
