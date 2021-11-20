import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingAppoinmentsComponent } from './pending-appoinments.component';

describe('PendingAppoinmentsComponent', () => {
  let component: PendingAppoinmentsComponent;
  let fixture: ComponentFixture<PendingAppoinmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingAppoinmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingAppoinmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
