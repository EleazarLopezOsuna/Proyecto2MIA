import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesconocidosComponent } from './desconocidos.component';

describe('DesconocidosComponent', () => {
  let component: DesconocidosComponent;
  let fixture: ComponentFixture<DesconocidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesconocidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesconocidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
