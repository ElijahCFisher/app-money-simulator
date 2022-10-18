import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Funcs } from 'src/services/funcs';

import { SourceComponent } from './source.component';

describe('SourceComponent', () => {
  let component: SourceComponent;
  let fixture: ComponentFixture<SourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SourceComponent);
    component = fixture.componentInstance;
    component.name = "Income";
    component.id = "0";
    component.rows = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should give ownJson', () => {
    expect(component.ownJson()).toEqual({"name": "Income", "id": "0", "rows": []});
  });

  it('should editSourceNameEvent', () => {
    spyOn(component.editSourceNameOut, 'emit');
    var edit = ['0', 'test name'];

    component.editSourceNameEvent(edit);

    expect(component.editSourceNameOut.emit).toHaveBeenCalledWith(edit);
  });

  it('should editSourceJsonEvent', () => {
    spyOn(component.editSourceJsonOut, 'emit');
    var edit = Funcs.jsonFromSource(component);
    edit["something"] = "new";

    component.editSourceJsonEvent(edit);

    expect(component.editSourceJsonOut.emit).toHaveBeenCalledWith(edit);
  });

  it('should deleteSourceOut', () => {
    spyOn(component.deleteSourceOut, 'emit');

    component.deleteSourceEvent();

    expect(component.deleteSourceOut.emit).toHaveBeenCalledWith(component.id);
  });

  it('should displayDialog on click', () => {
    expect(component.displayDialog).toBeFalse();

    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('#editSourcebutton') as HTMLElement;
    button.click();

    fixture.detectChanges();

    expect(component.displayDialog).toBeTrue();
  });
});
