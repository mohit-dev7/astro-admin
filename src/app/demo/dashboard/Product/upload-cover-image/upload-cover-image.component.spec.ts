import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCoverImageComponent } from './upload-cover-image.component';

describe('UploadCoverImageComponent', () => {
  let component: UploadCoverImageComponent;
  let fixture: ComponentFixture<UploadCoverImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadCoverImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCoverImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
