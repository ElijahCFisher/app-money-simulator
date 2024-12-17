import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core'
import { Funcs } from 'src/services/funcs'
import { SourceComponent } from '../source/source.component'
// Example loaded in ^

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.css']
})
export class ScenarioComponent {

  @Input() name: string = ""
  @Input() sources: any[] = []
  @Output() netWorthsEvent = new EventEmitter<[string, number][]>();
  popupShowing: boolean = false
  netWorths: [string, number][] = []
  netWorth = 0;
  ownSources: any[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.ownSources = this.sources.map((source) => structuredClone(source));
    this.simulate();
    console.log(this.netWorth, this.sources, this.netWorths)
    Promise.resolve().then(() => {this.netWorthsEvent.emit(this.netWorths)});
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  simulate (): void {
    this.ownSources.forEach(source => {
      this.netWorth += (source["type"] == "income" ? 0 : (source["type"] == "asset" ? 1 : -1))*source["value"]
    })

    let days_simulated = 365
    let today = new Date();

    for(let i = 0; i < days_simulated; i++, today.setDate(today.getDate()+1)) {
      this.ownSources.forEach(source => {
        let sourceType = source["type"];

        this.netWorth += sourceType == "income" ? source["value"]/365 : (sourceType == "asset" ? -source["value"] : source["value"])
        source["value"] *= Math.E**(source["interest_rate"]/365)
        this.netWorth += (sourceType == "income" ? 0 : (sourceType == "asset" ? 1 : -1)) * source["value"]
      })
      this.netWorths.push([String(today.toJSON().slice(0,10).replace(/-/g,'/')), this.netWorth])
    }
  }

}
