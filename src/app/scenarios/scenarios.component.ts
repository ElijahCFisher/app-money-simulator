import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core'
// Example loaded in ^

@Component({
  selector: 'app-scenarios',
  templateUrl: './scenarios.component.html',
  styleUrls: ['./scenarios.component.css']
})
export class ScenariosComponent implements OnInit {
  @Input() scenarios: any[] = []
  @Output() netWorthsEvent = new EventEmitter<[string, number][][]>();
  netWorthsArray: [string, number][][] = []

  constructor() {
  }

  ngOnInit(): void {

  }

  addNetWorths(newNetWorths: [string, number][]) {
    this.netWorthsArray.push(newNetWorths);
    this.netWorthsEvent.emit(this.netWorthsArray);
  }

}
