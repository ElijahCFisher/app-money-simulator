import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphComponent } from './graph/graph.component';
import { ScenarioComponent } from './scenario/scenario.component';
import { PersonSettingsComponent } from './person-settings/person-settings.component';
import { SourceComponent } from './source/source.component';
import { SourceSettingsRowComponent } from './source-settings-row/source-settings-row.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    ScenarioComponent,
    PersonSettingsComponent,
    SourceComponent,
    SourceSettingsRowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
