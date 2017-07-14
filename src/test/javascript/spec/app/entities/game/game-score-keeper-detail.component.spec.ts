/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ScorekeeperTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { GameScoreKeeperDetailComponent } from '../../../../../../main/webapp/app/entities/game/game-score-keeper-detail.component';
import { GameScoreKeeperService } from '../../../../../../main/webapp/app/entities/game/game-score-keeper.service';
import { GameScoreKeeper } from '../../../../../../main/webapp/app/entities/game/game-score-keeper.model';

describe('Component Tests', () => {

    describe('GameScoreKeeper Management Detail Component', () => {
        let comp: GameScoreKeeperDetailComponent;
        let fixture: ComponentFixture<GameScoreKeeperDetailComponent>;
        let service: GameScoreKeeperService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ScorekeeperTestModule],
                declarations: [GameScoreKeeperDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    GameScoreKeeperService,
                    JhiEventManager
                ]
            }).overrideTemplate(GameScoreKeeperDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GameScoreKeeperDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GameScoreKeeperService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new GameScoreKeeper(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.game).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
