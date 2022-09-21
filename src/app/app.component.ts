import { Attribute, Component } from '@angular/core';
import { ScenarioComponent } from './scenario/scenario.component';
import { SourceSettingsRowComponent } from './source-settings-row/source-settings-row.component';
import { SourceComponent } from './source/source.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-money-simulator2';
  lScenario: ScenarioComponent;
  rScenario: ScenarioComponent;

  constructor() {
    this.lScenario = new ScenarioComponent();
    this.rScenario = new ScenarioComponent();

    // Initializing example scenarios
    var json = require('./sources1.json');

    for(var src of json) {
      var source1: SourceComponent = this.sourceFromJson(src, 1)
      var source2: SourceComponent = this.sourceFromJson(src, 2)

      this.lScenario.sources.push(source1)
      this.rScenario.sources.push(source2)
    }
  }

  sourceFromJson(json: {[name: string]: any}, which: number = 0): SourceComponent {
    var ret: SourceComponent = new SourceComponent();
    ret.name = json["name"];
    
    // looping through each row depending on which scenario it is
    for(var row of (which ? (which == 1 ? json["rows1"] : json["rows2"]) : json["rows"])) {
      var rowComp: SourceSettingsRowComponent = new SourceSettingsRowComponent();
      if (Array.isArray(row)) {
        rowComp.attributes = {}
        for (var attribute of row)
          rowComp.attributes[attribute[0]] = attribute[1]
      }
      else
        rowComp.source = this.sourceFromJson(row)
      ret.rows.push(rowComp)
    }
    return ret;
  }

  newSource(source: SourceComponent, source2?: SourceComponent) {
    this.lScenario.sources.push(source)
    this.rScenario.sources.push(source2 ? source2 : source)
  }
}
