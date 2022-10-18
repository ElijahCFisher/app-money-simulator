import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSourcePopupComponent } from './edit-source-popup.component';
import sources1 from '../../assets/sources1.json'
import { Funcs } from 'src/services/funcs'

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
    component.componentAsJson = Funcs.sourceFromJson(sources1[1], 0).ownJson();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct textAsString', () => {
    // I should probably put this in a different file for cleanliness sake
    expect(component.textAsString()).toBe(`{
  "rows": [
    [
      [
        "Buy Date",
        "11/18/2021"
      ],
      [
        "Sell Date",
        "03/04/2023"
      ]
    ],
    {
      "name": "Mortgage",
      "id": "1.1",
      "rows": [
        [
          [
            "Start Date",
            "11/18/2021"
          ],
          [
            "End Date",
            "03/04/2023"
          ],
          [
            "Pay Schedule",
            "15 yr"
          ]
        ],
        [
          [
            "Start amount",
            "400001"
          ],
          [
            "Interest rate",
            "2.74"
          ]
        ]
      ]
    },
    [
      [
        "Start amount",
        "475001"
      ],
      [
        "Appreciation",
        "11%"
      ]
    ]
  ]
}`);
  });

  // // As I don't use this function, this will be implemented later
  // it('should removeIds', () => {
  //   expect(component.removeIds()).toBe();
  // });

  it('should closePopup', () => {
    spyOn(component.closePopupOut, 'emit');

    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('#closeButton') as HTMLElement;
    button.click();

    fixture.detectChanges();

    expect(component.closePopupOut.emit).toHaveBeenCalled();
  });

  it('should editSource when just name changed', () => {
    spyOn(component, 'editSourceName');
    spyOn(component, 'closePopupEvent');

    const compiled = fixture.nativeElement as HTMLElement;
    const name = compiled.querySelector('#popupName') as HTMLElement;
    const submitButton = compiled.querySelector('#submitButton') as HTMLElement;
    name.innerText = "new name";
    submitButton.click();

    fixture.detectChanges();

    expect(component.editSourceName).toHaveBeenCalled();
    expect(component.closePopupEvent).toHaveBeenCalled();
  });

  it('should editSource when just json changed', () => {
    spyOn(component, 'editSourceJson');
    spyOn(component, 'closePopupEvent');

    const compiled = fixture.nativeElement as HTMLElement;
    const json = compiled.querySelector('#sourceJson') as HTMLElement;
    const submitButton = compiled.querySelector('#submitButton') as HTMLElement;
    json.innerText = "new json";
    submitButton.click();

    fixture.detectChanges();

    expect(component.editSourceJson).toHaveBeenCalled();
    expect(component.closePopupEvent).toHaveBeenCalled();
  });

  it('should editSource when both name and json changed', () => {
    spyOn(component, 'editSourceName');
    spyOn(component, 'editSourceJson');
    spyOn(component, 'closePopupEvent');

    const compiled = fixture.nativeElement as HTMLElement;
    const name = compiled.querySelector('#popupName') as HTMLElement;
    const json = compiled.querySelector('#sourceJson') as HTMLElement;
    const submitButton = compiled.querySelector('#submitButton') as HTMLElement;
    name.innerText = "new name";
    json.innerText = "new json";
    submitButton.click();

    fixture.detectChanges();

    expect(component.editSourceName).toHaveBeenCalled();
    expect(component.editSourceJson).toHaveBeenCalled();
    expect(component.closePopupEvent).toHaveBeenCalled();
  });

  it('should not editSource when neither name nor json changed', () => {
    spyOn(component, 'closePopupEvent');

    const compiled = fixture.nativeElement as HTMLElement;
    const submitButton = compiled.querySelector('#submitButton') as HTMLElement;
    submitButton.click();

    fixture.detectChanges();

    expect(component.closePopupEvent).toHaveBeenCalled();
  });

  it('should deleteSource', () => {
    spyOn(component.deleteSourceOut, 'emit');
    spyOn(component, 'closePopupEvent');

    const compiled = fixture.nativeElement as HTMLElement;
    const deleteButton = compiled.querySelector('#deleteButton') as HTMLElement;
    deleteButton.click();

    fixture.detectChanges();

    expect(component.deleteSourceOut.emit).toHaveBeenCalled();
    expect(component.closePopupEvent).toHaveBeenCalled();
  });

  it('should editSourceName', () => {
    spyOn(component.editSourceNameOut, 'emit');
    const newName = "new name";
    const id = component.componentAsJson['id'];

    const compiled = fixture.nativeElement as HTMLElement;
    const name = compiled.querySelector('#popupName') as HTMLElement;
    name.innerText = newName;

    component.editSourceName();

    expect(component.componentAsJson['name']).toBe(newName);
    expect(component.editSourceNameOut.emit).toHaveBeenCalledWith([id, newName]);
  });

  it('should editSourceJson', () => {
    spyOn(component.editSourceJsonOut, 'emit');
    const newJson = '{"new": "json"}';
    const name = component.componentAsJson['name'];
    const id = component.componentAsJson['id'];
    const exp = JSON.parse(newJson);
    exp['name'] = name;
    exp['id'] = id;

    const compiled = fixture.nativeElement as HTMLElement;
    const json = compiled.querySelector('#sourceJson') as HTMLElement;
    json.innerText = newJson;

    component.editSourceJson();

    expect(component.componentAsJson).toEqual(exp);
    expect(component.editSourceJsonOut.emit).toHaveBeenCalledWith(exp);
  });
});
