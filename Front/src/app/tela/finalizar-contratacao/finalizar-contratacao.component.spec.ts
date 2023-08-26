import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarContratacaoComponent } from './finalizar-contratacao.component';

describe('FinalizarContratacaoComponent', () => {
  let component: FinalizarContratacaoComponent;
  let fixture: ComponentFixture<FinalizarContratacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalizarContratacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalizarContratacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
