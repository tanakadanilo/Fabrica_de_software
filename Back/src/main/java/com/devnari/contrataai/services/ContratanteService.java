package com.devnari.contrataai.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devnari.contrataai.model.Contratante;
import com.devnari.contrataai.persistencia.ContratanteDao;

@Service
public class ContratanteService {

	@Autowired
	ContratanteDao persistencia;

	public List<Contratante> findAll() {
		return persistencia.findAll();
	}

	public Contratante findById(int id) {
		return persistencia.findById(id).orElse(null);
	}

	public Contratante add(Contratante s) {
		s.setId(null);
		return persistencia.save(s);
	}

	public Contratante update(Contratante s) throws Exception {
		if (s.getId() == null) {
			throw new Exception("O objeto que se tentou editar veio sem ID");
		}
		return persistencia.save(s);
	}

}
