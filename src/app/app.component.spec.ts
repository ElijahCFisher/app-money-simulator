import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { GoogleApiService } from './google-api.service';

describe('AppComponent', () => {

  var fixture: ComponentFixture<AppComponent>
  var component: AppComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: GoogleApiService, useValue: {getUser: () => console.log("")}}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'app-money-simulator'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('app-money-simulator');
  });

  it('should getUser', () => {
    let email: string = "test@email.com"
    let testUser: Object = {info: {email: email}}
    spyOn<any>(component['google'], "getUser").and.returnValue(testUser)

    var response = component.getUser();

    expect(response).toBe(email);
  });

  it('should add newSource', () => {
    var newSource = ["-1", "testSource"];

    expect(component.sourcesInOnlyOne).not.toContain(newSource[0]);

    component.newSource(newSource);

    expect(component.sourcesInOnlyOne).toContain(newSource[0]);
    expect(component.appSources).toContain(newSource);

    component.newSource(newSource);

    expect(component.sourcesInOnlyOne).not.toContain(newSource[0]);
    expect(component.appSources).toContain(newSource);
  });

  it('should editSourceName', () => {
    component.appSources = [["0", "origName"],["1", "otherSource"]];
    var newName = ["0", "testSource"];

    component.editSourceName(newName);

    expect(component.appSources).toContain(newName);
  });

  it('should editSourceName', () => {
    component.appSources = [["0", "origName"],["1", "otherSource"]];
    var deleteSource = "0";

    expect(component.sourcesInOnlyOne).not.toContain(deleteSource);

    component.deleteSource(deleteSource);

    expect(component.appSources.map(source => source[0])).toContain(deleteSource);
    expect(component.sourcesInOnlyOne).toContain(deleteSource);

    component.deleteSource(deleteSource);

    expect(component.appSources.map(source => source[0])).not.toContain(deleteSource);
    expect(component.sourcesInOnlyOne).not.toContain(deleteSource);
  });
});
