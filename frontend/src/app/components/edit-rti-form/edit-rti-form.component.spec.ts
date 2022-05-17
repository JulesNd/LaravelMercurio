import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRtiFormComponent } from './edit-rti-form.component';

describe('EditRtiFormComponent', () => {
  let component: EditRtiFormComponent;
  let fixture: ComponentFixture<EditRtiFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRtiFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRtiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
