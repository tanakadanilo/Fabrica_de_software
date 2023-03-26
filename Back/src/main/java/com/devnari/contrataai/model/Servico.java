package com.devnari.contrataai.model;

import com.devnari.contrataai.exports.BaseEntity;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Servico extends BaseEntity {
	// * preenchido pelo banco
	private String area;

	// * preenchido pelo banco
	private String especialidade;

	// * preenchido pelo banco
	private String descricao;

}
