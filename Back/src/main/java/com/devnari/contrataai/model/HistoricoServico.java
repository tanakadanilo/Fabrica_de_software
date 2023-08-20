package com.devnari.contrataai.model;

import java.util.Date;

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

	@ManyToOne
	private Prestador prestador;

	@ManyToOne
	private Contratante contratante;

	@ManyToOne
	private ServicoPrestado servico;

	@Temporal(TemporalType.DATE)
	private Date dataContratacao;

	@Temporal(TemporalType.DATE)
	private Date dataExecucaoServico;

	private Double avaliacao;
}
