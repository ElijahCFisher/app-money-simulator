import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceRowComponent } from './source-row.component';

describe('SourceRowComponent', () => {
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

  // it('should give attributesAsArray when empty', () => {
  //   expect(component.attributesAsArray()).toEqual([]);
  // });

  // it('should give attributesAsArray', () => {
  //   component.attributes = {};
  //   component.attributes["att0"] = "some";
  //   component.attributes["att1"] = "attribute";
  //   expect(component.attributesAsArray()).toEqual([["att0", "some"],["att1", "attribute"]]);
  // });
});
