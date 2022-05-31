import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtiModalComponent } from './rti-modal.component';

describe('RtiModalComponent', () => {
  let component: RtiModalComponent;
  let fixture: ComponentFixture<RtiModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RtiModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RtiModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
