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
  netWorthsArray: [string, number][][] = [];
  Object = Object;

  ngOnInit() {
    fetch('assets/scenarios.json').then((r) => r.json()).then((data) => {
      this.scenarios = data
    })
  }

}
