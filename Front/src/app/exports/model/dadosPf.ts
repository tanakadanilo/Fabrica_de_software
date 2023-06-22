import { contato } from './contato';
import { endereco } from './endereco';
export interface dadosPf {
  nome: string,
  cpf: string,
  endereco: endereco,
  contato: contato,
  usuario: any

}
