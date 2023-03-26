package com.devnari.contrataai.model;

import java.util.List;

import com.devnari.contrataai.enumerations.DiasSemana;
import com.devnari.contrataai.enumerations.PeriodosDia;
import com.devnari.contrataai.exports.BaseEntity;
import com.devnari.contrataai.model.auxiliares.Contato;
import com.devnari.contrataai.model.auxiliares.Endereco;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Prestador extends BaseEntity {

	@Getter
	@Setter
	private class disponibilidade {
		private DiasSemana diaDaSemana;
		private PeriodosDia horário;
	}

	private String nome;
	private String email;

	@OneToMany
	@JoinColumn(name = "contato_id")
	private Contato contato;
	private String CPF;

	@OneToMany
	@JoinColumn(name = "endereco_id")
	private Endereco endereco;
	
// link da foto
	private String foto;

	@ManyToOne
	@JoinColumn(name = "pessoa_id")
	private List<ServicoPrestado> servicoPrestados;

// link do portfólio
	private String portfolio;
	@OneToMany
	@JoinColumn(name = "disponibilidade_id")
	private disponibilidade disponibilidades;
	private String descricaoAdicional;

}
