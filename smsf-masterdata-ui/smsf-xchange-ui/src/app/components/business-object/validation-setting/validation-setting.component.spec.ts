import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationSettingComponent } from './validation-setting.component';

describe('ValidationSettingComponent', () => {
  let component: ValidationSettingComponent;
  let fixture: ComponentFixture<ValidationSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
