import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutManagementComponent } from './about-management.component';

describe('AboutManagementComponent', () => {
  let component: AboutManagementComponent;
  let fixture: ComponentFixture<AboutManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
