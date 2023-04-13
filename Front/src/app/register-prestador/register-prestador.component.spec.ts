import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPrestadorComponent } from './register-prestador.component';

describe('RegisterPrestadorComponent', () => {
  let component: RegisterPrestadorComponent;
  let fixture: ComponentFixture<RegisterPrestadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPrestadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPrestadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
