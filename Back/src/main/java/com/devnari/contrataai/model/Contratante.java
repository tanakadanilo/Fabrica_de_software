package com.devnari.contrataai.model;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.devnari.contrataai.model.auxiliares.Contato;
import com.devnari.contrataai.model.auxiliares.Endereco;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
	
	@ManyToOne
	@JoinColumn(name = "contato_id")
	private Contato contato;
	private String cpf;

	@ManyToOne
	@JoinColumn(name = "endereco_id")
	private Endereco endereco;

	// * opcional
	private String foto;
}
