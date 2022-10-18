import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'app-money-simulator2'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('app-money-simulator2');
  });

  it('should add newSource', () => {
    let fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
    let component: AppComponent = fixture.componentInstance;
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
    let fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
    let component: AppComponent = fixture.componentInstance;
    component.appSources = [["0", "origName"],["1", "otherSource"]];
    var newName = ["0", "testSource"];

    component.editSourceName(newName);

    expect(component.appSources).toContain(newName);
  });

  it('should editSourceName', () => {
    let fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
    let component: AppComponent = fixture.componentInstance;
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
