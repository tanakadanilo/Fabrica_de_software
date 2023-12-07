import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaSuperManeiraComponent } from './tela-super-maneira.component';

describe('TelaSuperManeiraComponent', () => {
  let component: TelaSuperManeiraComponent;
  let fixture: ComponentFixture<TelaSuperManeiraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaSuperManeiraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaSuperManeiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
