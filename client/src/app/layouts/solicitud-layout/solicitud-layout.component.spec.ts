import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudLayoutComponent } from './solicitud-layout.component';

describe('SolicitudLayoutComponent', () => {
  let component: SolicitudLayoutComponent;
  let fixture: ComponentFixture<SolicitudLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
