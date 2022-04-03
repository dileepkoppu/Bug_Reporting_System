import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOfEmployeeComponent } from './details-of-employee.component';

describe('DetailsOfEmployeeComponent', () => {
  let component: DetailsOfEmployeeComponent;
  let fixture: ComponentFixture<DetailsOfEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsOfEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsOfEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
