package com.devnari.contrataai.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devnari.contrataai.model.auxiliares.Endereco;
import com.devnari.contrataai.persistencia.EnderecoDao;

@Service
public class EnderecoService {

	@Autowired
	EnderecoDao persistencia;

	public List<Endereco> findAll() {
		return persistencia.findAll();
	}

	public Endereco findById(Integer id) {
		return persistencia.findById(id).orElseThrow();
	}

	public Endereco save(Endereco e) {
		return persistencia.save(e);
	}
}
