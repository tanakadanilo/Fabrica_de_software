package com.devnari.contrataai.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Entity
@Data
public class HistoricoServico {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@OneToOne
	private Prestador prestador;

	@OneToOne
	private Contratante contratante;

	@OneToOne
	private ServicoPrestado servico;

	@Temporal(TemporalType.DATE)
	private Date dataContratacao;

	@Temporal(TemporalType.DATE)
	private Date dataExecucaoServico;

	private Double avaliacao;
}
