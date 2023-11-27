import { Servico } from './servico';

export interface ServicoPrestado {
  id: number;
  servico: Servico;
  experiencia: any;
  valor: number;
}
