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
  @Output() newSource = new EventEmitter<SourceComponent>();

  constructor() { 
    this.personSettings = new PersonSettingsComponent();
    this.sources = [];
  }

  ngOnInit(): void {
  }

  addSource(name: string): void {
    var n = new SourceComponent()
    n.name = name

    this.newSource.emit(n);
  }

}
