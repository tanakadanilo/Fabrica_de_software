package com.devnari.contrataai.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devnari.contrataai.model.auxiliares.Contato;
import com.devnari.contrataai.persistencia.ContatoDao;

@Service
public class ContatoService {

	@Autowired
	ContatoDao persistencia;

	public List<Contato> findAll() {
		return persistencia.findAll();
	}

	public Contato findById(Integer id) {
		return persistencia.findById(id).orElseThrow();
	}

	public Contato save(Contato c) {
		return persistencia.save(c);
	}
}
