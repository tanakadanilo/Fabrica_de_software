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

	public List<Contato> buscarTodos() {
		return persistencia.findAll();
	}

	public Contato buscarPorId(Long id) throws Exception {
		Contato contato = persistencia.findById(id).orElse(null);
		if (contato == null) {
			throw new Exception("Contato Não Encontrado!");
		}
		return contato;
	}

	public Contato salvar(Contato contato) throws Exception {
		if (contato == null) {
			throw new Exception("Contato Não Informado!");
		}
		return persistencia.save(contato);
	}

	public String deletarPorId(Long id) throws Exception {
		if (!persistencia.existsById(id)) {
			throw new Exception("Não Encontrado!");
		}
		persistencia.deleteById(id);
		return "Deletado Com Sucesso!";
	}
}
