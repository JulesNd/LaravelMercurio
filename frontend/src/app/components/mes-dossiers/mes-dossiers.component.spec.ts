import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesDossiersComponent } from './mes-dossiers.component';

describe('MesDossiersComponent', () => {
  let component: MesDossiersComponent;
  let fixture: ComponentFixture<MesDossiersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesDossiersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesDossiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
