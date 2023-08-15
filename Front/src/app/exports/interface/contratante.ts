import { Contato } from "./contato";
import { Endereco } from "./endereco";

export interface Contratante {
    
    id: number;
    nome: string;
    contato: Contato;
    cpf: string;
    endereco: Endereco;
    foto: string;

}
