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

	public List<Disponibilidade> buscarTodos() {
		return persistencia.findAll();
	}

	public Disponibilidade buscarPorId(Long id) throws Exception {
		Disponibilidade disponibilidade = persistencia.findById(id).orElse(null);
		if (disponibilidade == null) {
			throw new Exception("Disponibilidade Não Encontrada!");
		}

		return disponibilidade;
	}

	public Disponibilidade salvar(Disponibilidade disponibilidade) throws Exception {
		if (disponibilidade == null) {
			throw new Exception("Disponibilidade Não Informada!");
		}
		disponibilidade.setId(null);
		return persistencia.save(disponibilidade);
	}
}
