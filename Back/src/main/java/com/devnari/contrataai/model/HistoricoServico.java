package com.devnari.contrataai.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
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

	public HistoricoServico(Prestador prestador, Contratante contratante, ServicoPrestado servico, Date dataContratacao,
			Date dataExecucaoServico, Double avaliacao) {
		super();
		this.prestador = prestador;
		this.contratante = contratante;
		this.servico = servico;
		this.dataContratacao = dataContratacao;
		this.dataExecucaoServico = dataExecucaoServico;
		this.avaliacao = avaliacao;
	}
	
	
}
