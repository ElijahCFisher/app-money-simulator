import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-money-simulator2'
  appSources: string[][] = []
  sourcesInOnlyOne: Set<string> = new Set<string>;

  constructor() {
  }

  newSource(source: string[]) {
    if (this.sourcesInOnlyOne.has(source[0])) this.sourcesInOnlyOne.delete(source[0])
    else {
      this.sourcesInOnlyOne.add(source[0])
      this.appSources.push(source)
    }
  }

  editSourceName(edit: string[]): void {
    var id = edit[0]
    var name = edit[1]

    for (var [i, source] of this.appSources.entries()) {
      if (source[0] == id) {
        this.appSources[i][1] = name
        break
      }
    }
    // Need to clone because angular doesn't update unless reference changes...
    this.appSources = structuredClone(this.appSources)
  }

  deleteSource(id: string): void {
    if (this.sourcesInOnlyOne.has(id)) {
      this.appSources = this.appSources.filter(source => source[0] != id)
      this.sourcesInOnlyOne.delete(id)
    }
    else this.sourcesInOnlyOne.add(id)
  }
}
