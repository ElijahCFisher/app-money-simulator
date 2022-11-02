import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'


import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { GraphComponent } from './graph/graph.component'
import { ScenarioComponent } from './scenario/scenario.component'
import { SourceComponent } from './source/source.component'
import { SourceRowComponent } from './source-row/source-row.component'
import { EditSourcePopupComponent } from './edit-source-popup/edit-source-popup.component'
import { HttpClientModule } from  '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc'

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    ScenarioComponent,
    SourceComponent,
    SourceRowComponent,
    EditSourcePopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
