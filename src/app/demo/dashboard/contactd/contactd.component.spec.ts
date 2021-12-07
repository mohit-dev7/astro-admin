import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactdComponent } from './contactd.component';

describe('ContactdComponent', () => {
  let component: ContactdComponent;
  let fixture: ComponentFixture<ContactdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
