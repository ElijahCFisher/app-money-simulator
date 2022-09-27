import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { SourceSettingsRowComponent } from '../source-settings-row/source-settings-row.component';
import { Funcs } from 'src/services/funcs';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.css']
})
export class SourceComponent implements OnInit {

  @Input() name!: string;
  @Input() id!: string;
  @Input() rows: SourceSettingsRowComponent[];
  @Output() editNameEmit = new EventEmitter<string>();
  @Output() editJsonEmit = new EventEmitter<{[name: string]: any}>();
  displayDialog: boolean = false;

  constructor() {
    this.rows = [];
  }

  ngOnInit(): void {
  }

  editName(edit: string): void {
    this.editNameEmit.emit(edit)
  }

  editJson(edit: {[name: string]: any}): void {
    this.editJsonEmit.emit(edit)
  }

  ownJson(): {[name: string]: any} {
    var ret = Funcs.jsonFromSource(this)
    return ret
  }

}
