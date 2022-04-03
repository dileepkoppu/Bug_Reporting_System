import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBugreportComponent } from './create-bugreport.component';

describe('CreateBugreportComponent', () => {
  let component: CreateBugreportComponent;
  let fixture: ComponentFixture<CreateBugreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBugreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBugreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
