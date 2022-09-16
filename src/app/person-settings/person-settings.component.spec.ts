import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonSettingsComponent } from './person-settings.component';

describe('PersonSettingsComponent', () => {
  let component: PersonSettingsComponent;
  let fixture: ComponentFixture<PersonSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
