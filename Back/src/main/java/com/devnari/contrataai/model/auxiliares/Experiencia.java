package com.devnari.contrataai.model.auxiliares;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Experiencia {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Temporal(value = TemporalType.TIMESTAMP)
	@Column(nullable = false)
	private Date tempoExperiencia;
	private String certificado;
	@Column(nullable = false)
	private String descricaoAdcional;
}