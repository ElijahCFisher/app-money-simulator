import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSourcePopupComponent } from './edit-source-popup.component';

describe('EditPopupComponent', () => {
  let component: EditSourcePopupComponent;
  let fixture: ComponentFixture<EditSourcePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSourcePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSourcePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
