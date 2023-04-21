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

	public List<ServicoPrestado> findAll() {
		return persistencia.findAll();
	}

	public ServicoPrestado findById(int id) {
		return persistencia.findById(id).orElse(null);
	}

	public ServicoPrestado add(ServicoPrestado s) {
		s.setId(null);
		return persistencia.save(s);
	}

	public ServicoPrestado update(ServicoPrestado s) throws Exception {
		if (s.getId() == null) {
			throw new Exception("O objeto que se tentou editar veio sem ID");
		}
		return persistencia.save(s);
	}

}
