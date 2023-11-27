import { Contratante } from './contratante';
import { Prestador } from './prestador';
import { ServicoPrestado } from './servico-prestado';

export interface PropostaContratacao {
  id?: number;
  servicoPrestado: ServicoPrestado;
  contratante: Contratante;
  dataContratacao?: Date;
  prestador: Prestador;
}
