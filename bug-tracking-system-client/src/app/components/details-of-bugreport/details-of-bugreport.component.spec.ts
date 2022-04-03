import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOfBugreportComponent } from './details-of-bugreport.component';

describe('DetailsOfBugreportComponent', () => {
  let component: DetailsOfBugreportComponent;
  let fixture: ComponentFixture<DetailsOfBugreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsOfBugreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsOfBugreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
