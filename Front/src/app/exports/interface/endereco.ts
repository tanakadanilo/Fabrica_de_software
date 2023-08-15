import { Uf } from "../enum/uf";

export interface Endereco {

    cep: string;
    logradouro: string;
    numero: string;
    cidade: string;
    quadra: string;
    lote: string;
    uf: Uf;
    bairro: string;
    complemento: string;

}
