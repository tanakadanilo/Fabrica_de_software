package com.devnari.contrataai.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Data;

@Entity
@Data
public class PropostaContratacao {

	@Id
	private Integer id;
	
	private Servico servico;
	private Prestador prestador;
	private Contratante contratante;
	private Date dataContratacao;
	
	@PreUpdate
	@PrePersist
	private void preencheData() {
		this.dataContratacao =  new Date();
	}
}
