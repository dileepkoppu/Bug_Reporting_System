import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBugreportComponent } from './update-bugreport.component';

describe('UpdateBugreportComponent', () => {
  let component: UpdateBugreportComponent;
  let fixture: ComponentFixture<UpdateBugreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBugreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBugreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
