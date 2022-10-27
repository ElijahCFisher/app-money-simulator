import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core'
import { Funcs } from 'src/services/funcs'
import { HttpService } from '../http-service.service'
import { SourceComponent } from '../source/source.component'
import sources1 from '../../assets/sources1.json'
import sources1ScenarioSettings from '../../assets/sources1ScenarioSettings.json'
import { Observable } from 'rxjs'
// Example loaded in ^

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.css']
})
export class ScenarioComponent implements OnInit {

  @Input() index!: number
  @Input() appSources: string[][]
  @Output() appSourcesOut = new EventEmitter<string[][]>()
  @Output() newSourceOut = new EventEmitter<string[]>()
  @Output() editSourceNameOut = new EventEmitter<string[]>()
  @Output() deleteSourceOut = new EventEmitter<string>()
  scenarioSettings: SourceComponent
  scenarioSources: {[name: string]: SourceComponent}

  constructor(private httpService: HttpService) {
    this.appSources = []
    this.scenarioSettings = new SourceComponent()
    this.scenarioSources = {}
  }

  ngOnInit(): void {
    var response = this.httpService.getScenarios();
    response.subscribe({next: resp => {
      this.scenarioSettings = resp[this.index].scenarioSettings;
      this.scenarioSources = resp[this.index].scenarioSources;
    }, error: error => {
      console.log("Error getting scenarios, loading in example instead\n"+error)
      this.scenarioSettings = Funcs.sourceFromJson(sources1ScenarioSettings, this.index)

      for(var src of sources1) {
        var source: SourceComponent = Funcs.sourceFromJson(src, this.index)
        this.scenarioSources[source.id] = source
      }
    }}).add(() => {
      this.appSourcesOut.emit(Object.entries(this.scenarioSources).map(entry => [entry[0], entry[1].name]))
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (var [i, source] of Object.entries(this.scenarioSources)) source.name = this.sourcesListNameFromId(i)
  }

  // Helpers
  isIdInSources(id: string): boolean {
    return id in this.scenarioSources
  }

  sourcesListNameFromId(id: string): string {
    for(var source of this.appSources)
      if (source[0] == id) return source[1]
    return "NONE"
  }

  // Events
  newSourceEvent(name: string, id: string = crypto.randomUUID()): void {
    var n = new SourceComponent()
    n.id = id, n.name = name

    this.scenarioSources[id] = n

    var response: Observable<Object> = this.httpService.addSource(this.index+"", n)
    response.subscribe({next: res => console.log("Response when adding source: " + res), error: error => console.log("Error occurred when adding source: " + error)})

    this.newSourceOut.emit([n.id,n.name])
  }

  editSourceNameEvent(edit: string[]): void {
    this.editSourceNameOut.emit(edit)

    var response: Observable<Object> = this.httpService.editSource(this.index+"", this.scenarioSources[edit[0]])
    response.subscribe({next: res => console.log("Response when editing source name: " + res), error: error => console.log("Error occurred when editing source name: " + error)})
  }

  editSourceJsonEvent(edit: {[name: string]: any}): void {
    if (edit["id"] == "Scenario Settings") this.scenarioSettings = Funcs.sourceFromJson(edit)
    else this.scenarioSources[edit["id"]] = Funcs.sourceFromJson(edit)

    var response: Observable<Object> = this.httpService.editSource(this.index+"", this.scenarioSources[edit["id"]])
    response.subscribe({next: res => console.log("Response when editing source: " + res), error: error => console.log("Error occurred when editing source: " + error)})
  }

  deleteSourceEvent(id: string): void {
    var response: Observable<Object> = this.httpService.deleteSource(this.index+"", this.scenarioSources[id])
    response.subscribe({next: res => console.log("Response when deleting source: " + res), error: error => console.log("Error occurred when deleting source: " + error)})

    delete this.scenarioSources[id]
    this.deleteSourceOut.emit(id)
  }

}
