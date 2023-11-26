import { Contato } from './contato';
import { Disponibilidade } from './disponibilidade';
import { Endereco } from './endereco';

export interface ServicoPrestadoDto {
  id: number;
  idServico: number;
  area: string;
  nome: string;
  descricao: string;
  idExperiencia: number;
  tempoExperiencia: Date;
  certificado: string;
  descricaoAdcional: string;
  idPrestador: number;
  nomePrestador: string;
  contatoPrestador: Contato;
  cpfPrestador: string;
  enderecoPrestador: Endereco;
  fotoPrestador: string;
  portfolioPrestador: string;
  disponibilidades: Disponibilidade[];
  especializacao: string;
  descricaoAdcionalPrestador: string;
}
