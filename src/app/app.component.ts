import { Component } from '@angular/core';
import { ScenarioComponent } from './scenario/scenario.component';
import { SourceComponent } from './source/source.component';
import { Funcs } from '../services/funcs'

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
      this.lScenario.sources.push(Funcs.sourceFromJson(src, 1))
      this.rScenario.sources.push(Funcs.sourceFromJson(src, 2))
    }
  }

  newSource(source: SourceComponent, source2?: SourceComponent) {
    this.lScenario.sources.push(source)
    this.rScenario.sources.push(source2 ? source2 : source)
  }

  editName(edit: string, which: number = 1): void {
    var name = edit.substring(0, edit.indexOf("."))
    var id = edit.substring(edit.indexOf(".")+1)

    if (!id.includes(".")) {
      this.lScenario.sources[parseInt(id)].name = name
      this.rScenario.sources[parseInt(id)].name = name
      return
    }

    var firstInd = parseInt(id.substring(0, id.indexOf('.')))
    id = id.substring(id.indexOf('.')+1)
    var secondInd;
    if (id.includes(".")) {
      secondInd = parseInt(id.substring(0, id.indexOf(".")))
      id = id.substring(id.indexOf(".")+1)
    }
    else {
      secondInd = parseInt(id)
      id = "";
    }

    ;(which == 1 ? this.lScenario : this.rScenario).sources[firstInd].rows[secondInd].source = this.editNameRecurse((which == 1 ? this.lScenario : this.rScenario).sources[firstInd].rows[secondInd].source!, name+"."+id)
  }

  editNameRecurse(component: SourceComponent, edit: string): SourceComponent {
    var name = edit.substring(0, edit.indexOf("."))
    var id = edit.substring(edit.indexOf(".")+1)

    if (id === undefined || id.length == 0) {
      component.name = name
      return component
    }

    var firstInd;
    if (id.includes(".")) {
      firstInd = parseInt(id.substring(0, id.indexOf(".")))
      id = id.substring(id.indexOf(".")+1)
    }
    else {
      firstInd = parseInt(id)
      id = ""
    }

    return component.rows[firstInd].source = this.editNameRecurse(component.rows[firstInd].source!, name+"."+id)
  }

  editJson(edit: {[name: string]: any}, which: number = 1): void {
    edit["id2"] = edit["id"]

    if (!edit["id2"].includes(".")) {
      (which == 1 ? this.lScenario : this.rScenario).sources[parseInt(edit["id2"])] = Funcs.sourceFromJson(edit);
      return
    }

    var firstInd = parseInt(edit["id2"].substring(0, edit["id2"].indexOf(".")))
    edit["id2"] = edit["id2"].substring(edit["id2"].indexOf(".")+1)
    var secondInd;
    if (edit["id2"].includes(".")) {
      secondInd = parseInt(edit["id2"].substring(0, edit["id2"].indexOf(".")))
      edit["id2"] = edit["id2"].substring(edit["id2"].indexOf(".")+1)
    }
    else {
      secondInd = parseInt(edit["id2"])
      edit["id2"] = "";
    }

    ;(which == 1 ? this.lScenario : this.rScenario).sources[firstInd].rows[secondInd].source = this.editJsonRecurse((which == 1 ? this.lScenario : this.rScenario).sources[firstInd].rows[secondInd].source!, edit)
  }

  editJsonRecurse(component: SourceComponent, edit: {[name: string]: any}): SourceComponent {
    if (edit["id2"] === undefined || edit["id2"].length == 0) return Funcs.sourceFromJson(edit)

    var firstInd;
    if (edit["id2"].includes(".")) {
      firstInd = parseInt(edit["id2"].substring(0, edit["id2"].indexOf(".")))
      edit["id2"] = edit["id2"].substring(edit["id2"].indexOf(".")+1)
    }
    else {
      firstInd = parseInt(edit["id2"])
      edit["id2"] = ""
    }

    return component.rows[firstInd].source = this.editJsonRecurse(component.rows[firstInd].source!, edit)
  }
}
