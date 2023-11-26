package com.devnari.contrataai.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Entity
@Data
public class PropostaContratacao {

	@Id
	private Integer id;

	@ManyToOne
	private Servico servico;
	@ManyToOne
	private Prestador prestador;
	@ManyToOne
	private Contratante contratante;
	@Temporal(TemporalType.TIMESTAMP)
	private Date dataContratacao;

	@PreUpdate
	@PrePersist
	private void preencheData() {
		this.dataContratacao = new Date();
	}
}
