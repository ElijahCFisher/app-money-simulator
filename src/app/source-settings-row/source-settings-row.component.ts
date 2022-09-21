import { Component, Input, OnInit } from '@angular/core';
import { SourceComponent } from '../source/source.component';

@Component({
  selector: 'app-source-settings-row',
  templateUrl: './source-settings-row.component.html',
  styleUrls: ['./source-settings-row.component.css']
})
export class SourceSettingsRowComponent implements OnInit {

  @Input() attributes?: ({[key: string]: string});
  @Input() source?: SourceComponent;

  constructor() {
  }

  ngOnInit(): void {
  }

  attrsAsArray(): [string, string][] {
    if (this.attributes)
      return Object.entries(this.attributes)
    return [];
  }

}
