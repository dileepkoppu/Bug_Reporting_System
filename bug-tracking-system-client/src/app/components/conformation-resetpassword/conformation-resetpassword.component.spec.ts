import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConformationResetpasswordComponent } from './conformation-resetpassword.component';

describe('ConformationResetpasswordComponent', () => {
  let component: ConformationResetpasswordComponent;
  let fixture: ComponentFixture<ConformationResetpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConformationResetpasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConformationResetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
