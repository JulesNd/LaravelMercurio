import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftuploadComponent } from './draftupload.component';

describe('DraftuploadComponent', () => {
  let component: DraftuploadComponent;
  let fixture: ComponentFixture<DraftuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftuploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
