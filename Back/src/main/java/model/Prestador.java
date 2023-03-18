package model;

import java.util.List;

import exports.BaseEntity;
import lombok.Getter;
import lombok.Setter;
import model.auxiliares.Contato;
import model.auxiliares.Endereco;

@Getter
@Setter
public class Prestador extends BaseEntity {

	@Getter
	@Setter
	private class disponibilidade {
		// * deve usar um enum para cada atributo
		private String diaDaSemana;
		private String horário;
	}

	private String nome;
	private String email;
	private Contato contato;
	private String CPF;
	private Endereco endereco;
	private String foto;
	private List<ServicoPrestado> servicos;
	private String portfolio;
	private disponibilidade disponibilidades;
	private String descricaoAdicional;

}
