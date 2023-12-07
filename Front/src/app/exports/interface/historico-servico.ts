import { StatusServico } from '../enum/status-servico';
import { Contratante } from './contratante';
import { Prestador } from './prestador';
import { ServicoPrestado } from './servico-prestado';

export interface HistoricoServico {
  id?: number;
  prestador: Prestador;
  contratante: Contratante;
  servico: ServicoPrestado;
  dataContratacao: Date;
  dataExecucaoServico: Date;
  avaliacao?: number;
  status: StatusServico;
}
