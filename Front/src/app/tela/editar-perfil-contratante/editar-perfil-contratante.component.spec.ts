import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPerfilContratanteComponent } from './editar-perfil-contratante.component';

describe('EditarPerfilContratanteComponent', () => {
  let component: EditarPerfilContratanteComponent;
  let fixture: ComponentFixture<EditarPerfilContratanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarPerfilContratanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPerfilContratanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
