import { Contratante } from "./contratante";
import { Prestador } from "./prestador";
import { Servico } from "./servico";
import { ServicoPrestado } from "./servico-prestado";

export interface  PropostaContratacao {
	
    id: number;
	
	servicoPrestado: ServicoPrestado;
	prestador: Prestador;
	contratante: Contratante;
	dataContratacao: Date;

}
