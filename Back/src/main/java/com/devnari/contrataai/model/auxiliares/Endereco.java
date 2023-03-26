package com.devnari.contrataai.model.auxiliares;

import com.devnari.contrataai.enumerations.UF;
import com.devnari.contrataai.exports.BaseEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Endereco  extends BaseEntity{

	private String cep;
	private String logradouro;
	private String numero;
	private String cidade;
	
	@Enumerated
	private UF uf;
	private String bairro;
	private String complemento;
	
}
