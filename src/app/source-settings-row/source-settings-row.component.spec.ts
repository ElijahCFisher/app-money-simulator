import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceSettingsRowComponent } from './source-settings-row.component';

describe('SourceSettingsRowComponent', () => {
  let component: SourceSettingsRowComponent;
  let fixture: ComponentFixture<SourceSettingsRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SourceSettingsRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SourceSettingsRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
