import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRtisComponent } from './all-rtis.component';

describe('AllRtisComponent', () => {
  let component: AllRtisComponent;
  let fixture: ComponentFixture<AllRtisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllRtisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRtisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
