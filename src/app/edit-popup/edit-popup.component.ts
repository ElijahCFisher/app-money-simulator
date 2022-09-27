import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit-popup.component.html',
  styleUrls: ['./edit-popup.component.css']
})
export class EditPopupComponent implements OnInit {

  @Output() editNameEmit = new EventEmitter<string>();
  @Output() editJsonEmit = new EventEmitter<{[name: string]: any}>();
  @Output() closeEmit = new EventEmitter();
  @Input() text: {[name: string]: any} = {};

  constructor() { }

  ngOnInit(): void {
  }

  close(): void {
    this.closeEmit.emit();
  }

  textAsString(): string {
    var toString = structuredClone(this.text)
    delete toString['name']
    delete toString['id']
    return JSON.stringify(toString, null, 2)
  }

  editName(): void {
    console.log("NAME??")
    console.log("yo?", this.text['name'], document.getElementById('name')!.textContent!, this.text['name'] != document.getElementById('popup-name')!.textContent!)
    this.text['name'] = document.getElementById('popup-name')!.textContent!
    this.editNameEmit.emit(this.text['name'] + "."+this.text['id'])
  }

  editJson(): void {
    console.log("JSON??")
    var name = this.text['name']
    var id = this.text['id']
    this.text = JSON.parse(document.getElementById('json')!.textContent!)
    this.text['name'] = name
    this.text['id'] = id

    this.editJsonEmit.emit(this.text);
  }

  edit(): void {
    if (this.text['name'] != document.getElementById('popup-name')!.textContent!) this.editName();
    if (this.textAsString() != document.getElementById('json')!.textContent!) this.editJson();
    this.close()
  }

}
