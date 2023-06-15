import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilprestadorComponent } from './perfilprestador.component';

describe('PerfilprestadorComponent', () => {
  let component: PerfilprestadorComponent;
  let fixture: ComponentFixture<PerfilprestadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilprestadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilprestadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
