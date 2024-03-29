import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilContratanteComponent } from './perfil-contratante.component';

describe('PerfilContratanteComponent', () => {
  let component: PerfilContratanteComponent;
  let fixture: ComponentFixture<PerfilContratanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilContratanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilContratanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
