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

	public List<Experiencia> buscarTodos() {
		return persistencia.findAll();

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
