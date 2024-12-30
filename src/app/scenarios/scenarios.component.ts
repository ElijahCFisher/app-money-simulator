import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core'
// Example loaded in ^

@Component({
  selector: 'app-scenarios',
  templateUrl: './scenarios.component.html',
  styleUrls: ['./scenarios.component.css']
})
export class ScenariosComponent implements OnInit {
  @Input() scenarios: any[] = []
  @Output() netWorthsEvent = new EventEmitter<{[key: string]: [string, number][]}>();
  netWorthsArray: {[key: string]: [string, number][]} = {};

  constructor() {
  }

  ngOnInit(): void {

  }

  addNetWorths(key:string, newNetWorths: [string, number][]) {
    this.netWorthsArray[key] = (newNetWorths);
    this.netWorthsEvent.emit(this.netWorthsArray);
  }

}
