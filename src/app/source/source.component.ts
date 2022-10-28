import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core'
import { SourceRowComponent } from '../source-row/source-row.component'
import { Funcs } from 'src/services/funcs'

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.css']
})
export class SourceComponent implements OnInit {

  @Input() name!: string
  @Input() id!: string
  @Input() rows: SourceRowComponent[]
  @Input() editable: boolean
  @Output() editSourceNameOut = new EventEmitter<string[]>()
  @Output() editSourceJsonOut = new EventEmitter<{[name: string]: any}>()
  @Output() deleteSourceOut = new EventEmitter<string>()
  displayDialog: boolean = false

  constructor() {
    this.rows = []
    this.editable = true
  }

  deserialize(input: any): this {
    if (input == null) {
      Object.assign(this, null)
      return this
    }
    Object.assign(this, input)
    this.rows = input.rows.map((row:any) => new SourceRowComponent().deserialize(row))
    return this
  }

  ngOnInit(): void {
  }

  // Helpers
  ownJson(): {[name: string]: any} {
    return Funcs.jsonFromSource(this)
  }

  // Events
  editSourceNameEvent(edit: string[]): void {
    this.editSourceNameOut.emit(edit)
  }

  editSourceJsonEvent(edit: {[name: string]: any}): void {
    this.editSourceJsonOut.emit(edit)
  }

  deleteSourceEvent(): void {
    this.deleteSourceOut.emit(this.id)
  }

}
