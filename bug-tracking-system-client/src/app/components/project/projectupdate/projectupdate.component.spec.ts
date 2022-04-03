import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectupdateComponent } from './projectupdate.component';

describe('ProjectupdateComponent', () => {
  let component: ProjectupdateComponent;
  let fixture: ComponentFixture<ProjectupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectupdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
