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

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append("CEP: " + cep).append(", estado: " + uf).append(", cidade: " + cidade).append(", bairro: " + bairro)
				.append(", rua: " + logradouro).append(", qd: " + quadra).append(", lote: " + lote)
				.append(", numero: " + numero).append(", complemento: " + complemento);

		return sb.toString();
	}
}