import { Component, Input, OnInit } from '@angular/core';
import { SourceSettingsRowComponent } from '../source-settings-row/source-settings-row.component';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.css']
})
export class SourceComponent implements OnInit {

  @Input() name!: string;
  rows: SourceSettingsRowComponent[];

  constructor() {
    this.rows = [];
  }

  ngOnInit(): void {
  }

}
