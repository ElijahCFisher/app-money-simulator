import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ScenarioComponent } from './scenario/scenario.component';
import { SourceComponent } from './source/source.component';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url: string = 'http://localhost:8081'

  constructor(private http: HttpClient) { }

  getScenarios(): Observable<ScenarioComponent[]> {
    return this.http.get<ScenarioComponent[]>(this.url + "/scenarios/").pipe(map((res: ScenarioComponent[]) => res.map((scenario: ScenarioComponent) => new ScenarioComponent(this).deserialize(scenario))))
  }

  addSource(scenarioId: string, body: SourceComponent): Observable<Object> {
    return this.http.post(this.url + `/${scenarioId}/source/`, body)
  }

  editSource(scenarioId: string, body: SourceComponent): Observable<Object> {
    return this.http.put(this.url + `/${scenarioId}/source/${body.id}/`, body)
  }

  deleteSource(scenarioId: string, body: SourceComponent): Observable<Object> {
    return this.http.delete(this.url + `/${scenarioId}/source/${body.id}/`)
  }
}
