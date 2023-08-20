import { Contato } from "./contato";
import { Endereco } from "./endereco";

export interface Contratante {

    id: number;
    nome: string;
    contato: Contato;
    cpfCnpj: string;
    endereco: Endereco;
    foto: string;

}
