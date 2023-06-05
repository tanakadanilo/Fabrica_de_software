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

	public List<Servico> buscarTodos() {
		return persistencia.findAll();
	}

	public Servico buscarPorId(Long id) throws Exception {
		Servico servico = persistencia.findById(id).orElse(null);

		if (servico == null) {
			throw new Exception("Serviço Não Encontrado!");
		}

		return servico;
	}

	public List<Servico> buscarPorParametros(String nomeCategoria, String nomeServico) {
		List<Servico> servicos = persistencia.findByParams(nomeCategoria, nomeServico);
		return servicos;
	}

	public List<Servico> buscarPorCategoria(String categoria) {
		List<Servico> servicos = persistencia.findByArea(categoria);
		return servicos;
	}

	public Servico salvar(Servico servico) throws Exception {
		if (servico == null) {
			throw new Exception("Serviço Não Informado!");
		}
		servico.setId(null);
		return persistencia.save(servico);
	}

	public Servico atualizar(Servico servico) throws Exception {
		if (servico.getId() == null) {
			throw new Exception("Serviço Não Encontrado!");
		}
		return persistencia.save(servico);
	}

	public String deletarPorId(Long id) throws Exception {
		if (!persistencia.existsById(id)) {
			throw new Exception("Não Encontrado!");
		}
		persistencia.deleteById(id);
		return "Deletado Com Sucesso!";
	}

}
