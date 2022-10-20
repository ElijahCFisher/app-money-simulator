import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from  '@angular/common/http';
import { Funcs } from 'src/services/funcs';

import { ScenarioComponent } from './scenario.component';

describe('ScenarioComponent', () => {
  let component: ScenarioComponent;
  let fixture: ComponentFixture<ScenarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenarioComponent ],
      imports: [HttpClientModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScenarioComponent);
    component = fixture.componentInstance;
    component.index = 0;
    fixture.detectChanges();
    while(Object.keys(component.scenarioSources).length == 0) await new Promise(r => setTimeout(r, 1));
    component.appSources = Object.keys(component.scenarioSources).map(key => [key, component.scenarioSources[key].name]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.scenarioSources["0"].rows[0].attributes!["Start Date"]).toContain("03");
  });

  it('should tell isIdInSources', () => {
    var id0 = "0";
    var id1 = "3";
    expect(component.isIdInSources(id0)).toBeTrue();
    expect(component.isIdInSources(id1)).toBeTrue();
  });

  it('should tell not isIdInSources', () => {
    var id0 = "-1";
    var id1 = "5";
    expect(component.isIdInSources(id0)).toBeFalse();
    expect(component.isIdInSources(id1)).toBeFalse();
  });

  it('should give sourcesListNameFromId', () => {
    var id0 = "1";
    var id1 = "3";
    var id2 = "-1";
    var id3 = "5";
    expect(component.sourcesListNameFromId(id0)).toBe("House");
    expect(component.sourcesListNameFromId(id1)).toBe("Income");
    expect(component.sourcesListNameFromId(id2)).toBe("NONE");
    expect(component.sourcesListNameFromId(id3)).toBe("NONE");
  });

  it('should have newSourceEvent', () => {
    spyOn(component.newSourceOut, 'emit');
    var newName = "NEW NAME";

    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('#addNewButton') as HTMLElement;
    button.click();

    fixture.detectChanges();

    expect(Object.values(component.scenarioSources).map(source => source.name)).toContain(newName);
    expect(component.newSourceOut.emit).toHaveBeenCalledWith([jasmine.any(String), newName]);
  });

  it('should editSourceNameEvent', () => {
    spyOn(component.editSourceNameOut, 'emit');
    var edit = ['0', 'test name'];

    component.editSourceNameEvent(edit);

    fixture.detectChanges();

    expect(component.editSourceNameOut.emit).toHaveBeenCalledWith(edit);
  });

  it('should editSourceJsonEvent', () => {
    var id = "0";
    var edit = Funcs.jsonFromSource(component.scenarioSources[id]);
    edit["something"] = "new";

    component.editSourceJsonEvent(edit);

    fixture.detectChanges();

    expect(component.scenarioSources[edit['id']]).toEqual(Funcs.sourceFromJson(edit));
  });

  it('should deleteSourceEvent', () => {
    spyOn(component.deleteSourceOut, 'emit');
    var id = "0";

    component.deleteSourceEvent(id);

    fixture.detectChanges();

    expect(Object.keys(component.scenarioSources)).not.toContain(id);
    expect(component.deleteSourceOut.emit).toHaveBeenCalledWith(id);
  });
});
