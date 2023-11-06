package com.devnari.contrataai.model.dto;

import java.util.Date;
import java.util.List;

import com.devnari.contrataai.model.Prestador;
import com.devnari.contrataai.model.ServicoPrestado;
import com.devnari.contrataai.model.auxiliares.Contato;
import com.devnari.contrataai.model.auxiliares.Disponibilidade;
import com.devnari.contrataai.model.auxiliares.Endereco;

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
	private Long idPrestador;
	private String nomePrestador;
	private Contato contatoPrestador;
	private String cpfPrestador;
	private Endereco enderecoPrestador;
	private String fotoPrestador;
	private String portfolioPrestador;
	private List<Disponibilidade> disponibilidades;
	private String especializacao;
	private String descricaoAdcionalPrestador;

	public ServicoPrestadoDto() {
	}

	public void adicionarDadosPrestador(Prestador prestador) {
		this.idPrestador = prestador.getId();
		this.nomePrestador = prestador.getNome();
		this.contatoPrestador = prestador.getContato();
		this.cpfPrestador = prestador.getCpf();
		this.enderecoPrestador = prestador.getEndereco();
		this.fotoPrestador = prestador.getFoto();
		this.portfolioPrestador = prestador.getPortfolio();
		this.disponibilidades = prestador.getDisponibilidades();
		this.especializacao = prestador.getEspecializacao();
		this.descricaoAdcionalPrestador = prestador.getDescricaoAdicional();
	}

	public ServicoPrestadoDto(ServicoPrestado servicoPrestado) {
		this.id = servicoPrestado.getId();
		this.idServico = servicoPrestado.getServico().getId();
		this.area = servicoPrestado.getServico().getArea();
		this.nome = servicoPrestado.getServico().getNome();
		this.descricao = servicoPrestado.getServico().getDescricao();
		this.idExperiencia = servicoPrestado.getExperiencia().getId();
		this.tempoExperiencia = servicoPrestado.getExperiencia().getTempoExperiencia();
		this.certificado = servicoPrestado.getExperiencia().getCertificado();
		this.descricaoAdcional = servicoPrestado.getServico().getDescricao();
	}

}
