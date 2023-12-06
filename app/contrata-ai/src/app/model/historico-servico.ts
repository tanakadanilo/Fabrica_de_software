import { Contratante } from './contratante';
import { Prestador } from './prestador';
import { ServicoPrestado } from './servico-prestado';

export interface HistoricoServico {
  id?: number;
  prestador: Prestador;
  contratante: Contratante;
  servico: ServicoPrestado;
  data: Date;
  dataExecucaoServico: Date;
  avaliacao?: number;
}
