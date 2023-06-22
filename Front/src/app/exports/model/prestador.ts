import { contato } from "./contato";
import { endereco } from "./endereco";

export interface Prestador {

    nome:string,
    contato:contato,
    endereco:endereco,
    servicosPrestados:any,
    especializacao:string,
    urlImagem:string


}
