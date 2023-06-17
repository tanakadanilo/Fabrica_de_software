package com.devnari.contrataai.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devnari.contrataai.model.Prestador;
import com.devnari.contrataai.model.Servico;
import com.devnari.contrataai.model.ServicoPrestado;
import com.devnari.contrataai.model.auxiliares.Experiencia;
import com.devnari.contrataai.persistencia.PrestadorDao;
import com.devnari.contrataai.util.StringUtil;

@Service
public class PrestadorService {

	@Autowired
	PrestadorDao persistencia;
	@Autowired
	ServicoService servicoService;
	@Autowired
	ServicoPrestadoService servicoPrestadoService;
	@Autowired
	ExperienciaService experienciaService;

	public List<Prestador> buscarTodos() {
		return persistencia.findAll();
	}

	public Prestador buscarPorId(Long id) throws Exception {

		Prestador prestador = persistencia.findById(id).orElse(null);
		if (prestador == null) {
			throw new Exception("Prestador Não Encontrado!");
		}
		return prestador;
	}

	public List<Prestador> buscarPorCpf(String cpf) {
		cpf = StringUtil.tratarStringNullEUndefinned(cpf);
		List<Prestador> prestadores = persistencia.findByCpf(cpf);
		return prestadores;
	}

	public List<Prestador> buscarPorNome(String nome) {
		nome = StringUtil.tratarStringNullEUndefinned(nome);
		List<Prestador> prestadores = persistencia.findByNome(nome);
		return prestadores;
	}

	public Prestador buscarPrestadorPorServicoPrestado(Long id) {
		Prestador prestador = persistencia.findPrestadorByServicoPrestado(id);
		return prestador;
	}

	public Prestador salvar(Prestador prestador) throws Exception {
		if (prestador == null) {
			throw new Exception("Prestador Não Informado!");
		}
		return persistencia.save(prestador);
	}

	public Prestador atualizar(Prestador prestador) throws Exception {
		if (prestador.getId() == null) {
			throw new Exception("Prestador Não Encontrado!");
		}
		return persistencia.save(prestador);
	}

	public String deletarPorId(Long id) throws Exception {
		if (!persistencia.existsById(id)) {
			throw new Exception("Não Encontrado!");
		}
		persistencia.deleteById(id);
		return "deletado Com Sucesso!";
	}

	public Prestador adicionarServico(Long idPrestador, Long idServicoPrestado) throws Exception {
		Prestador prestador = persistencia.findById(idPrestador).orElseThrow();
		ServicoPrestado servicoPrestado = servicoPrestadoService.buscarPorId(idServicoPrestado);
		prestador.getServicosPrestados().add(servicoPrestado);
		return prestador;
	}

	public ServicoPrestado criarServicoPrestado(Long idPrestador, Long idServico, Long idExperiencia) throws Exception {
		Servico servico = servicoService.buscarPorId(idServico);
		Prestador prestador = this.buscarPorId(idPrestador);
		Experiencia experiencia = experienciaService.buscarPorId(idExperiencia);
		ServicoPrestado servicoPrestado = new ServicoPrestado();
		servicoPrestado.setExperiencia(experiencia);
		servicoPrestado.setPrestador(prestador);
		servicoPrestado.setServico(servico);
		return servicoPrestadoService.salvar(servicoPrestado);
	}

}
