package com.devnari.contrataai.model;

import com.devnari.contrataai.exports.BaseEntity;
import com.devnari.contrataai.model.auxiliares.Contato;
import com.devnari.contrataai.model.auxiliares.Endereco;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Contratante extends BaseEntity {

	private String nome;
	private String email;

	@OneToMany
	@JoinColumn(name = "pessoa_id")
	private Contato contato;
	private String CPF;
	@OneToMany
	@JoinColumn(name = "endereco_id")
	private Endereco endereco;

	// * opcional
	private String foto;
}
