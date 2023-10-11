import { DiaSemana } from '../enum/dia-semana';
import { PeriodosDia } from '../enum/periodos-dia';

export interface Disponibilidade {
  id: number;
  diaDaSemana: DiaSemana;
  horario: PeriodosDia;
}
