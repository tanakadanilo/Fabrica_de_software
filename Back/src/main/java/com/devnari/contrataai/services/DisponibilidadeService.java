package com.devnari.contrataai.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devnari.contrataai.model.auxiliares.Disponibilidade;
import com.devnari.contrataai.persistencia.DisponibilidadeDao;

@Service
public class DisponibilidadeService {

	@Autowired
	DisponibilidadeDao persistencia;

	public List<Disponibilidade> findAll() {
		return persistencia.findAll();
	}

	public Disponibilidade findById(int id) {
		return persistencia.findById(id).orElse(null);
	}

	public Disponibilidade save(Disponibilidade d) {
		d.setId(null);
		return persistencia.save(d);
	}
}
