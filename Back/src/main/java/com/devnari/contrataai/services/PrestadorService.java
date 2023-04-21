package com.devnari.contrataai.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devnari.contrataai.model.Prestador;
import com.devnari.contrataai.persistencia.PrestadorDao;

@Service
public class PrestadorService {

	@Autowired
	PrestadorDao persistencia;

	public List<Prestador> findAll() {
		return persistencia.findAll();
	}

	public Prestador findById(int id) {
		return persistencia.findById(id).orElse(null);
	}

	public Prestador add(Prestador s) {
		s.setId(null);
		return persistencia.save(s);
	}

	public Prestador update(Prestador s) throws Exception {
		if (s.getId() == null) {
			throw new Exception("O objeto que se tentou editar veio sem ID");
		}
		return persistencia.save(s);
	}

}
