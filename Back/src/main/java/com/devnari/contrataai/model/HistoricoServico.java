package com.devnari.contrataai.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Entity
@Data
public class HistoricoServico {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne(optional = false)
	private Prestador prestador;

	@ManyToOne(optional = false)
	private Contratante contratante;

	@ManyToOne(optional = false)
	private ServicoPrestado servico;

	@Temporal(TemporalType.DATE)
	@Column(nullable = false)
	private Date dataContratacao;

	@Temporal(TemporalType.DATE)
	@Column(nullable = false)
	private Date dataExecucaoServico;

	@Column(nullable = true)
	private Double avaliacao;
}
