import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerModuleComponent } from './jobseeker-module.component';

describe('JobseekerModuleComponent', () => {
  let component: JobseekerModuleComponent;
  let fixture: ComponentFixture<JobseekerModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobseekerModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobseekerModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
