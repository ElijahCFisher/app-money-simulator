import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PersonSettingsComponent } from '../person-settings/person-settings.component';
import { SourceComponent } from '../source/source.component';

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.css']
})
export class ScenarioComponent implements OnInit {

  personSettings: PersonSettingsComponent;
  @Input() sources: SourceComponent[];
  @Output() newSourceEmit = new EventEmitter<SourceComponent>();
  @Output() editNameEmit = new EventEmitter<string>();
  @Output() editJsonEmit = new EventEmitter<{[name: string]: any}>();

  constructor() {
    this.personSettings = new PersonSettingsComponent();
    this.sources = [];
  }

  ngOnInit(): void {
  }

  newSource(name: string): void {
    var n = new SourceComponent()
    n.name = name

    this.newSourceEmit.emit(n);
  }

  editName(edit: string): void {
    this.editNameEmit.emit(edit)
  }

  editJson(edit: {[name: string]: any}): void {
    this.editJsonEmit.emit(edit)
  }

}
