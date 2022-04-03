import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugreportListComponent } from './bugreport-list.component';

describe('BugreportListComponent', () => {
  let component: BugreportListComponent;
  let fixture: ComponentFixture<BugreportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugreportListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugreportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
