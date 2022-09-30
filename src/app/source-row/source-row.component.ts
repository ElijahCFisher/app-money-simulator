import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { SourceComponent } from '../source/source.component'

@Component({
  selector: 'app-source-row',
  templateUrl: './source-row.component.html',
  styleUrls: ['./source-row.component.css']
})
export class SourceRowComponent implements OnInit {

  @Input() attributes?: ({[key: string]: string})
  @Input() source?: SourceComponent
  @Output() editSourceNameOut  = new EventEmitter<string[]>()
  @Output() editSourceJsonOut  = new EventEmitter<{[name: string]: any}>()

  constructor() {
  }

  ngOnInit(): void {
  }

  // Helpers
  attributesAsArray(): [string, string][] {
    return this.attributes ? Object.entries(this.attributes) : []
  }

}
