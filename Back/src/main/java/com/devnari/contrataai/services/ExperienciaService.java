package com.devnari.contrataai.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.devnari.contrataai.model.auxiliares.Experiencia;
import com.devnari.contrataai.persistencia.ExperienciaDao;

@Service
public class ExperienciaService {

	@Autowired
	ExperienciaDao persistencia;

	public Page<Experiencia> buscarTodos(int page,int size) {
		return persistencia.findAll(PageRequest.of(page, size));

	}

	public Experiencia buscarPorId(Long id) throws Exception {
		Experiencia experiencia = persistencia.findById(id).orElse(null);
		if (experiencia == null) {
			throw new Exception("Experiência Não Encontrada!");
		}
		return experiencia;
	}

	public Experiencia salvar(Experiencia experiencia) throws Exception {
		if (experiencia == null) {
			throw new Exception("Experiência Não Informada!");
		}
		return persistencia.save(experiencia);
	}

	public String deletarPorId(Long id) throws Exception {
		if (!persistencia.existsById(id)) {
			throw new Exception("Não Encontrado!");
		}
		persistencia.deleteById(id);
		return "deletado Com Sucesso!";
	}

}
