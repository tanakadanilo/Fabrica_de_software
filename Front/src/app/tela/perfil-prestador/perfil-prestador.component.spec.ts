import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilPrestadorComponent } from './perfil-prestador.component';

describe('PerfilComponent', () => {
  let component: PerfilPrestadorComponent;
  let fixture: ComponentFixture<PerfilPrestadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilPrestadorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilPrestadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
