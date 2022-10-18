import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core'
import { Funcs } from 'src/services/funcs'
import { SourceComponent } from '../source/source.component'
import sources1 from '../../assets/sources1.json'
import sources1ScenarioSettings from '../../assets/sources1ScenarioSettings.json'
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

  constructor() {
    this.appSources = []
    this.scenarioSettings = new SourceComponent()
    this.scenarioSources = {}
  }

  ngOnInit(): void {
    this.scenarioSettings = Funcs.sourceFromJson(sources1ScenarioSettings, this.index)

    for(var src of sources1) {
      var source: SourceComponent = Funcs.sourceFromJson(src, this.index)
      this.scenarioSources[source.id] = source
    }
    // Example loaded in ^

    this.appSourcesOut.emit(Object.entries(this.scenarioSources).map(entry => [entry[0], entry[1].name]))
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
    this.newSourceOut.emit([n.id,n.name])
  }

  editSourceNameEvent(edit: string[]): void {
    this.editSourceNameOut.emit(edit)
  }

  editSourceJsonEvent(edit: {[name: string]: any}): void {
    if (edit["id"] == "Scenario Settings") this.scenarioSettings = Funcs.sourceFromJson(edit)
    else this.scenarioSources[edit["id"]] = Funcs.sourceFromJson(edit)
  }

  deleteSourceEvent(id: string): void {
    delete this.scenarioSources[id]
    this.deleteSourceOut.emit(id)
  }

}
