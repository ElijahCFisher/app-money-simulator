import { Component, OnInit } from '@angular/core';
import { SourceComponent } from '../source/source.component';

@Component({
  selector: 'app-source-settings-row',
  templateUrl: './source-settings-row.component.html',
  styleUrls: ['./source-settings-row.component.css']
})
export class SourceSettingsRowComponent implements OnInit {

  attributes: ({[key: string]: string});
  source?: SourceComponent;

  constructor() {
    this.attributes = {};
  }

  ngOnInit(): void {
  }

  attrsAsArray(): [string, string][] {
    return Object.entries(this.attributes)
  }

}
