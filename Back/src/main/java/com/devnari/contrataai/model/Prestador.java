package com.devnari.contrataai.model;

import java.util.ArrayList;
import java.util.List;

import com.devnari.contrataai.model.auxiliares.Contato;
import com.devnari.contrataai.model.auxiliares.Disponibilidade;
import com.devnari.contrataai.model.auxiliares.Endereco;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Prestador {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String nome;

	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "contato_id")
	private Contato contato;
	private String cpf;

	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "endereco_id")
	private Endereco endereco;

// link da foto
	private String foto;

	@OneToMany(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "pessoa_id")
	private List<ServicoPrestado> servicosPrestados = new ArrayList<>();

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<HistoricoServico> historicoServicosPrestados = new ArrayList<>();

// link do portfólio
	private String portfolio;
	@ManyToMany(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "disponibilidade_id")
	@JsonIgnore
	private List<Disponibilidade> disponibilidades;

	private String descricaoAdicional;

	private String especializacao;
	
	@OneToOne
	private Usuario usuario;

}
