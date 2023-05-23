package com.devnari.contrataai.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devnari.contrataai.model.Servico;
import com.devnari.contrataai.persistencia.ServicoDao;

@Service
public class ServicoService {

	@Autowired
	ServicoDao persistencia;

	public List<Servico> findAll() {
		return persistencia.findAll();
	}

	public List<Servico> findByParams(String nomeCategoria, String nomeServico) {
		return persistencia.findByParams(nomeCategoria, nomeServico);
	}

	public Servico findById(int id) {
		return persistencia.findById(id).orElse(null);
	}

	public List<Servico> findByCategoria(String categoria) {
		return persistencia.findByArea(categoria);
	}

	public Servico add(Servico s) {
		s.setId(null);
		return persistencia.save(s);
	}

	public Servico update(Servico s) throws Exception {
		if (s.getId() == null) {
			throw new Exception("O objeto que se tentou editar veio sem ID");
		}
		return persistencia.save(s);
	}

}
