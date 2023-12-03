import { Contato } from "./contato";
import { Endereco } from "./endereco";
import { Usuario } from "./usuario";

export interface Contratante {

    id: number;
    nome: string;
    contato: Contato;
    cpfCnpj: string;
    endereco: Endereco;
    foto: string;
    usuario:Usuario;

}
