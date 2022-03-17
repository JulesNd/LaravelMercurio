import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyrtisComponent } from './myrtis.component';

describe('MyrtisComponent', () => {
  let component: MyrtisComponent;
  let fixture: ComponentFixture<MyrtisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyrtisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyrtisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
