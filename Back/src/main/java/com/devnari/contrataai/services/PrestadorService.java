package com.devnari.contrataai.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devnari.contrataai.model.Prestador;
import com.devnari.contrataai.model.Servico;
import com.devnari.contrataai.model.ServicoPrestado;
import com.devnari.contrataai.model.auxiliares.Experiencia;
import com.devnari.contrataai.persistencia.PrestadorDao;

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

	public List<Prestador> findAll() {
		return persistencia.findAll();
	}

	public Prestador findById(int id) {
		return persistencia.findById(id).orElse(null);
	}

	public Prestador save(Prestador s) {
		s.setId(null);
		return persistencia.save(s);
	}

	public Prestador update(Prestador s) throws Exception {
		if (s.getId() == null) {
			throw new Exception("O objeto que se tentou editar veio sem ID");
		}
		return persistencia.save(s);
	}

	public Prestador adicionarServico(Integer idPrestador, Integer idServicoPrestado) {
		Prestador prestador = persistencia.findById(idPrestador).orElseThrow();
		ServicoPrestado servicoPrestado = servicoPrestadoService.findById(idServicoPrestado);
		prestador.getServicoPrestados().add(servicoPrestado);
		return prestador;
	}

	public ServicoPrestado criarServicoPrestado(Integer idPrestador, Integer idServico, Integer idExperiencia) {
		Servico servico = servicoService.findById(idServico);
		Prestador prestador = this.findById(idPrestador);
		Experiencia experiencia = experienciaService.findById(idExperiencia);
		ServicoPrestado servicoPrestado = new ServicoPrestado();
		servicoPrestado.setExperiencia(experiencia);
		servicoPrestado.setPrestador(prestador);
		servicoPrestado.setServico(servico);
		return servicoPrestadoService.save(servicoPrestado);
	}

}
