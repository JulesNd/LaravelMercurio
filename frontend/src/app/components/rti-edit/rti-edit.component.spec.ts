import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtiEditComponent } from './rti-edit.component';

describe('RtiEditComponent', () => {
  let component: RtiEditComponent;
  let fixture: ComponentFixture<RtiEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RtiEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RtiEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
