import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { HttpService } from './http-service.service';
import { ScenarioComponent } from './scenario/scenario.component';
import { SourceComponent } from './source/source.component';

describe('HttpService', () => {
  let url: string = 'localhost:8080';
  let service: HttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getScenarios', () => {
    var scen1: ScenarioComponent = new ScenarioComponent(service);
    var scen2: ScenarioComponent = new ScenarioComponent(service);
    scen1.index = 0;
    scen2.index = 12;
    var ret: Observable<ScenarioComponent[]> = of([scen1, scen2]);

    spyOn<any>(service['http'], 'get').and.returnValue(ret);

    var response = service.getScenarios();
    response.subscribe({next: resp => {
      expect(resp[0].index).toBe(0);
      expect(resp[1].index).toBe(12);
    }});
  });

  it('should addSource', () => {
    var source: SourceComponent = new SourceComponent();
    var scenarioId = "0";
    var ret: string = "Success";
    source.name = "test name";

    var response = service.addSource(scenarioId, source);
    response.subscribe({next: resp => {
      expect(resp).toBe("Success");
    }});

    const request = httpMock.expectOne(`${url}/${scenarioId}/source/`);
    expect(request.request.method).toEqual("POST");
    expect(request.request.body).toEqual(source);
    request.flush(ret);
    httpMock.verify();
  });

  it('should editSource', () => {
    var source: SourceComponent = new SourceComponent();
    var scenarioId = "0";
    var ret: string = "Success";
    source.name = "test name";
    source.id = "22";

    var response = service.editSource(scenarioId, source);
    response.subscribe({next: resp => {
      expect(resp).toBe("Success");
    }});

    const request = httpMock.expectOne(`${url}/${scenarioId}/source/${source.id}/`);
    expect(request.request.method).toEqual("PUT");
    expect(request.request.body).toEqual(source);
    request.flush(ret);
    httpMock.verify();
  });

  it('should deleteSource', () => {
    var source: SourceComponent = new SourceComponent();
    var scenarioId = "0";
    var ret: string = "Success";
    source.name = "test name";
    source.id = "22";

    var response = service.deleteSource(scenarioId, source);
    response.subscribe({next: resp => {
      expect(resp).toBe("Success");
    }});

    const request = httpMock.expectOne(`${url}/${scenarioId}/source/${source.id}/`);
    expect(request.request.method).toEqual("DELETE");
    request.flush(ret);
    httpMock.verify();
  });
});
