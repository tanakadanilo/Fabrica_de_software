package com.devnari.contrataai.model.dto;

import java.util.Date;

import com.devnari.contrataai.model.Prestador;

import lombok.Data;

@Data
public class ServicoPrestadoDto {
	private Long id;

	private Long idServico;
	private String area;
	private String nome;
	private String descricao;
	private Long idExperiencia;
	private Date tempoExperiencia;
	private String certificado;
	private String descricaoAdcional;
	private Prestador prestador;

	public ServicoPrestadoDto() {
	}

	public ServicoPrestadoDto(Long id, Long idServico, String area, String nome, String descricao,
			Long idExperiencia, Date tempoExperiencia, String certificado, String descricaoAdcional,
			Prestador prestador) {
		this.id = id;
		this.idServico = idServico;
		this.area = area;
		this.nome = nome;
		this.descricao = descricao;
		this.idExperiencia = idExperiencia;
		this.tempoExperiencia = tempoExperiencia;
		this.certificado = certificado;
		this.descricaoAdcional = descricaoAdcional;
		this.prestador = prestador;
	}

}
