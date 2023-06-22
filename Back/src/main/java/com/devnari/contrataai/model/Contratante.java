package com.devnari.contrataai.model;

import java.util.ArrayList;
import java.util.List;

import com.devnari.contrataai.model.auxiliares.Contato;
import com.devnari.contrataai.model.auxiliares.Endereco;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Contratante {

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

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<HistoricoServico> historicoServicosContratados = new ArrayList<>();

	// * opcional
	private String foto;

	private Usuario usuario;
}
