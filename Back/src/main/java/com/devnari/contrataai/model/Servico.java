package com.devnari.contrataai.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Servico {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	// * preenchido pelo banco
	private String area;

	// * preenchido pelo banco
	private String especialidade;

	// * preenchido pelo banco
	private String descricao;

}
