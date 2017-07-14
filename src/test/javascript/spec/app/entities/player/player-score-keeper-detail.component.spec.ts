/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ScorekeeperTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PlayerScoreKeeperDetailComponent } from '../../../../../../main/webapp/app/entities/player/player-score-keeper-detail.component';
import { PlayerScoreKeeperService } from '../../../../../../main/webapp/app/entities/player/player-score-keeper.service';
import { PlayerScoreKeeper } from '../../../../../../main/webapp/app/entities/player/player-score-keeper.model';

describe('Component Tests', () => {

    describe('PlayerScoreKeeper Management Detail Component', () => {
        let comp: PlayerScoreKeeperDetailComponent;
        let fixture: ComponentFixture<PlayerScoreKeeperDetailComponent>;
        let service: PlayerScoreKeeperService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ScorekeeperTestModule],
                declarations: [PlayerScoreKeeperDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PlayerScoreKeeperService,
                    JhiEventManager
                ]
            }).overrideTemplate(PlayerScoreKeeperDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PlayerScoreKeeperDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlayerScoreKeeperService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new PlayerScoreKeeper(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.player).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
