import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRtiComponent } from './add-rti.component';

describe('AddRtiComponent', () => {
  let component: AddRtiComponent;
  let fixture: ComponentFixture<AddRtiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRtiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRtiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
