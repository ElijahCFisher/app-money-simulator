import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { SourceComponent } from '../source/source.component'

@Component({
  selector: 'app-edit-source-popup',
  templateUrl: './edit-source-popup.component.html',
  styleUrls: ['./edit-source-popup.component.css']
})
export class EditSourcePopupComponent implements OnInit {

  @Input() componentAsJson: {[name: string]: any} = {}
  @Output() editSourceNameOut = new EventEmitter<string[]>()
  @Output() editSourceJsonOut = new EventEmitter<{[name: string]: any}>()
  @Output() closePopupOut = new EventEmitter()
  @Output() deleteSourceOut = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  // Helpers
  textAsString(): string {
    var toString = structuredClone(this.componentAsJson)
    delete toString['name']
    // WARNING: ids of source components can be modified lol (I have a function to remove sourceIds (this.removeIds), but I can't put them back lol)
    delete toString['id']

    return JSON.stringify(toString, null, 2)
  }

  // function not in use, but probably will in the future
  removeIds(toString: {[name: string]: any}): {[name: string]: any} {
    if ('id' in toString) delete toString['id']
    if ('rows' in toString)
      for (const [i, row] of toString['rows'].entries())
        if (!Array.isArray(row)) toString['rows'][i] = this.removeIds(toString['rows'][i])
    return toString
  }

  // Events
  closePopupEvent(): void {
    this.closePopupOut.emit()
  }

  editSourceEvent(): void {
    if (this.componentAsJson['name'] != document.getElementById('popupName')!.textContent!) this.editSourceName()
    if (this.textAsString() != document.getElementById('sourceJson')!.textContent!) this.editSourceJson()
    this.closePopupEvent()
  }

  deleteSourceEvent(): void {
    this.deleteSourceOut.emit()
    this.closePopupEvent()
  }

  // Event helpers
  editSourceName(): void {
    this.componentAsJson['name'] = document.getElementById('popupName')!.textContent!
    this.editSourceNameOut.emit([this.componentAsJson['id'], this.componentAsJson['name']])
  }

  editSourceJson(): void {
    var [name, id] = [this.componentAsJson['name'], this.componentAsJson['id']]
    this.componentAsJson = JSON.parse(document.getElementById('sourceJson')!.textContent!)
    this.componentAsJson['name'] = name, this.componentAsJson['id'] = id

    this.editSourceJsonOut.emit(this.componentAsJson)
  }

}
