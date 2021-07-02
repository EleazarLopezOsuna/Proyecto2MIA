import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingupLayoutComponent } from './singup-layout.component';

describe('SingupLayoutComponent', () => {
  let component: SingupLayoutComponent;
  let fixture: ComponentFixture<SingupLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingupLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingupLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
