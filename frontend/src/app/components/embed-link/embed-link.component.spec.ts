import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbedLinkComponent } from './embed-link.component';

describe('EmbedLinkComponent', () => {
  let component: EmbedLinkComponent;
  let fixture: ComponentFixture<EmbedLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbedLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbedLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
