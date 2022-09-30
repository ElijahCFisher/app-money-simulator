import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceRowComponent } from './source-row.component';

describe('SourceSettingsRowComponent', () => {
  let component: SourceRowComponent;
  let fixture: ComponentFixture<SourceRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SourceRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SourceRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
