import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SourceComponent } from '../source/source.component';

@Component({
  selector: 'app-source-settings-row',
  templateUrl: './source-settings-row.component.html',
  styleUrls: ['./source-settings-row.component.css']
})
export class SourceSettingsRowComponent implements OnInit {

  @Input() attributes?: ({[key: string]: string});
  @Input() source?: SourceComponent;
  @Output() editNameEmit  = new EventEmitter<string>();
  @Output() editJsonEmit  = new EventEmitter<{[name: string]: any}>();

  constructor() {
  }

  ngOnInit(): void {
  }

  attrsAsArray(): [string, string][] {
    if (this.attributes)
      return Object.entries(this.attributes)
    return [];
  }

  editName(edit: string): void {
    this.editNameEmit.emit(edit)
  }

  editJson(edit: {[name: string]: any}): void {
    this.editJsonEmit.emit(edit)
  }

}
