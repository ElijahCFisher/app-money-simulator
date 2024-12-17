import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
// import { Deserializable } from '../deserializable.model'
import { SourceComponent } from '../source/source.component'

@Component({
  selector: 'app-source-row',
  templateUrl: './source-row.component.html',
  styleUrls: ['./source-row.component.css']
})
export class SourceRowComponent implements OnInit {

  // @Input() attributes?: ({[key: string]: string})
  @Input() attributes?: string[][]
  @Input() source?: SourceComponent
  @Output() editSourceNameOut  = new EventEmitter<string[]>()
  @Output() editSourceJsonOut  = new EventEmitter<{[name: string]: any}>()

  constructor() {
  }

  deserialize(input: any): this {
    if (input == null) {
      Object.assign(this, null)
      return this
    }
    Object.assign(this, input)
    if (input.source != null) this.source = new SourceComponent().deserialize(input.source)
    return this
  }

  ngOnInit(): void {
  }

  // Helpers
  // attributesAsArray(): [string, string][] {
  //   return this.attributes ? Object.entries(this.attributes) : []
  // }

}
