package com.devnari.contrataai.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devnari.contrataai.model.ServicoPrestado;
import com.devnari.contrataai.persistencia.ServicoPrestadoDao;

@Service
public class ServicoPrestadoService {

	@Autowired
	ServicoPrestadoDao persistencia;
	@Autowired
	ServicoService servicoService;
	@Autowired
	ExperienciaService experienciaService;

	public List<ServicoPrestado> findAll() {
		return persistencia.findAll();
	}

	public ServicoPrestado findById(int id) {
		return persistencia.findById(id).orElseThrow();
	}

	public ServicoPrestado save(ServicoPrestado s) {
		s.setId(null);
		return persistencia.save(s);
	}

	public ServicoPrestado update(ServicoPrestado s) throws Exception {
		if (s.getId() == null) {
			throw new Exception("Tentando alterar um objeto que não foi encontrado");
		}
		return persistencia.save(s);
	}

}
