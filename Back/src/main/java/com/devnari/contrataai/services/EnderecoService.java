package com.devnari.contrataai.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.devnari.contrataai.model.auxiliares.Endereco;
import com.devnari.contrataai.persistencia.EnderecoDao;

@Service
public class EnderecoService {

	@Autowired
	EnderecoDao persistencia;

	public Page<Endereco> buscarTodos(int page, int size) {
		return persistencia.findAll(PageRequest.of(page, size));
	}

	public Endereco buscarPorId(Long id) throws Exception {
		Endereco endereco = persistencia.findById(id).orElse(null);
		if (endereco == null) {
			throw new Exception("Endereço Não Encontrado!");
		}

		return endereco;
	}

	public Endereco salvar(Endereco endereco) throws Exception {
		if (endereco == null) {
			throw new Exception("Endereço Não Informado!");
		}
		return persistencia.save(endereco);
	}

	public String deletarPorId(Long id) throws Exception {
		if (!persistencia.existsById(id)) {
			throw new Exception("Não Encontrado!");
		}
		persistencia.deleteById(id);
		return "deletado Com Sucesso!";
	}
}
