import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { GraphComponent } from './graph/graph.component'
import { ScenarioComponent } from './scenario/scenario.component'
import { ScenarioSettingsComponent } from './scenario-settings/scenario-settings.component'
import { SourceComponent } from './source/source.component'
import { SourceRowComponent } from './source-row/source-row.component'
import { EditSourcePopupComponent } from './edit-source-popup/edit-source-popup.component'

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    ScenarioComponent,
    ScenarioSettingsComponent,
    SourceComponent,
    SourceRowComponent,
    EditSourcePopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
