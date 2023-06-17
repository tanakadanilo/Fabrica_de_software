import { DiasSemana } from './dias-semana';
import { Horario } from './horario';

export interface Disponibilidade {
  diaDaSemana: DiasSemana;
  horario: Horario;
}
