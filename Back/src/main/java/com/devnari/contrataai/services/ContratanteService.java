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

	public List<Contratante> buscarTodos() {
		List<Contratante> contratantes = persistencia.findAll();
		return contratantes;
	}

	public Contratante buscarPorId(Long id) throws Exception {
		Contratante contratante = persistencia.findById(id).orElse(null);
		if (contratante == null) {
			throw new Exception("Contratante Não Encontrado!");
		}
		return contratante;
	}

	public List<Contratante> buscarPorNome(String nome) throws Exception {
		List<Contratante> contratantes = persistencia.findByNome(nome);
		return contratantes;
	}

	public List<Contratante> buscarPorCpf(String cpf) throws Exception {
		List<Contratante> contratantes = persistencia.findByCpf(cpf);
		return contratantes;
	}

	public Contratante salvar(Contratante contratante) throws Exception {
		if (contratante == null) {
			throw new Exception("Contratante Não Informado!");
		}
		contratante.setId(null);
		return persistencia.save(contratante);
	}

	public Contratante atualizar(Contratante contratante) throws Exception {
		if (contratante.getId() == null) {
			throw new Exception("Contratante Não Encontrado!");
		}
		return persistencia.save(contratante);
	}

}
