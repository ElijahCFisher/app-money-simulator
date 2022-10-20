import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScenarioComponent } from './scenario/scenario.component';
import { SourceComponent } from './source/source.component';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url: string = 'localhost:8080'

  constructor(private http: HttpClient) { }

  getScenarios(): Observable<ScenarioComponent[]> {
    return this.http.get<ScenarioComponent[]>(this.url + "/scenarios/")
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
