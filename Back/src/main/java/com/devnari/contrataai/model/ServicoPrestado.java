package com.devnari.contrataai.model;

import com.devnari.contrataai.exports.BaseEntity;
import com.devnari.contrataai.model.auxiliares.Experiencia;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class ServicoPrestado extends BaseEntity {

	@OneToMany
	@JoinColumn(name = "servico_id")
	private Servico servico;
	private Experiencia experiencia;

}
