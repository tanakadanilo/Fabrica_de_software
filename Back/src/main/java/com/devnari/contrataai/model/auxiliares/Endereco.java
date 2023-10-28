package com.devnari.contrataai.model.auxiliares;

import com.devnari.contrataai.enumerations.UF;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Endereco {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String cep;
	@Column(nullable = false)
	private String logradouro;
	@Column(nullable = false)
	private String numero;
	@Column(nullable = false)
	private String cidade;
	private String quadra;
	private String lote;
	@Enumerated
	@Column(nullable = false)
	private UF uf;
	@Column(nullable = false)
	private String bairro;
	private String complemento;

}