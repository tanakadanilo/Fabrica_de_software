import { Contato } from './contato';
import { Endereco } from './endereco';
import { Usuario } from './usuario';

export interface Contratante {
  id?: number;
  nome: string;
  contato: Contato;
  cpf: string;
  endereco: Endereco;
  usuario?: Usuario;
}
