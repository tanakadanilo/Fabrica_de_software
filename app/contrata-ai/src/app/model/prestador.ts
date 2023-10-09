import { Contato } from "./contato";
import { Endereco } from "./endereco";

export interface Prestador {

    
    id: number;
    nome: string;
    contato: Contato;
    cpfCnpj: string;
    endereco: Endereco;
    foto: string;
    servicosPrestados: string;
    historicoServicosPrestados: string;
    portfolio: string;
    disponibilidades: string;
    descricaoAdicional: string;
    especializacao: string;
}
