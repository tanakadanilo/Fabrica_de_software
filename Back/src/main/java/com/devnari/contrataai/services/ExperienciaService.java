package com.devnari.contrataai.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devnari.contrataai.model.auxiliares.Experiencia;
import com.devnari.contrataai.persistencia.ExperienciaDao;

@Service
public class ExperienciaService {

	@Autowired
	ExperienciaDao persistencia;

	public Experiencia salvar(Experiencia e) {
		return persistencia.save(e);
	}

	public Experiencia findById(Integer id) {
		return persistencia.findById(id).orElseThrow();
	}

	public List<Experiencia> findAll() {
		return persistencia.findAll();
	}
}
