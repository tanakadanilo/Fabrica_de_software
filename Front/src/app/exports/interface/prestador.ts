import { Contato } from "./contato";
import { Endereco } from "./endereco";
import { Servico } from "./servico";
import { ServicoPrestado } from "./servico-prestado";

export interface Prestador {

    id: number;
    nome: string;
    contato: Contato;
    cpfCnpj: string;
    endereco: Endereco;
    foto: string;
    servicosPrestados: ServicoPrestado[];
    historicoServicosPrestados: string;
    portfolio: string;
    disponibilidades: string;
    descricaoAdicional: string;
    especializacao: string;
}


