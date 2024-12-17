import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ScenariosComponent } from './scenarios/scenarios.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'app-money-simulator'
  scenarios: object[] = []
  netWorthsArray: [string, number][][]|undefined;

  ngOnInit() {
    fetch('assets/scenarios.json').then((r) => r.json()).then((data) => {
      console.log(data)
      this.scenarios = data
    })
  }

  handleNetWorthsArray(arr: [string, number][][]) {
    this.netWorthsArray = [...arr];
    console.log("eh?");
  }
}
