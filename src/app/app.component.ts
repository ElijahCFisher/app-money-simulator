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

    var json = require('./sources1.json');

    for(var src of Object.keys(json)) {
      var source: SourceComponent = this.sourceFromJson(src, json[src])

      console.log(source)

      this.lScenario.sources.push(source)
      this.rScenario.sources.push(source)
    }

  }

  newSource(source: SourceComponent) {
    this.lScenario.sources.push(source)
    this.rScenario.sources.push(source)
  }

  sourceFromJson(name: string, json: any[]): SourceComponent {
    var ret: SourceComponent = new SourceComponent();
    ret.name = name;
    for(var row of json) {
      var rowComp: SourceSettingsRowComponent = new SourceSettingsRowComponent();
      if (Array.isArray(row))
        for (var attribute of row)
          rowComp.attributes[attribute[0]] = attribute[1]
      else
        rowComp.source = this.sourceFromJson(Object.keys(row)[0], row[Object.keys(row)[0]])
      ret.rows.push(rowComp)
    }
    return ret;
  }
}
