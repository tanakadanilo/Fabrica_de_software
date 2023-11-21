package com.devnari.contrataai.model.auxiliares;

import com.devnari.contrataai.enumerations.UF;

import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Entity
@ToString
public class Endereco {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String cep;
	private String logradouro;
	private String numero;
	private String cidade;
	private String quadra;
	private String lote;
	@Enumerated
	private UF uf;
	private String bairro;
	private String complemento;

}

// cep: string,
//logradouro: string,
//numero: string,
//quadra: string,
//lote: string,
//cidade: string,
//uf: string,
