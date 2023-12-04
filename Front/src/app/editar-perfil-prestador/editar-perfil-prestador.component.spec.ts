import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPerfilPrestadorComponent } from './editar-perfil-prestador.component';

describe('EditarPerfilPrestadorComponent', () => {
  let component: EditarPerfilPrestadorComponent;
  let fixture: ComponentFixture<EditarPerfilPrestadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarPerfilPrestadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPerfilPrestadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
