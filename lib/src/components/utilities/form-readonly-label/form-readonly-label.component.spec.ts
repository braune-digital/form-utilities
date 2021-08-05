import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormReadonlyLabelComponent } from './form-readonly-label.component';

describe('FormReadonlyLabelComponent', () => {
  let component: FormReadonlyLabelComponent;
  let fixture: ComponentFixture<FormReadonlyLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormReadonlyLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormReadonlyLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
