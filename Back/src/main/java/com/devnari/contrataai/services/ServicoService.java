package com.devnari.contrataai.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.devnari.contrataai.model.Servico;
import com.devnari.contrataai.persistencia.ServicoDao;

@Service
public class ServicoService {

	@Autowired
	ServicoDao persistencia;

	public Page<Servico> buscarTodos(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size) {
		return persistencia.findAll(PageRequest.of(page, size));
	}

	public Servico buscarPorId(Long id) throws Exception {
		Servico servico = persistencia.findById(id).orElse(null);

		if (servico == null) {
			throw new Exception("Serviço Não Encontrado!");
		}

		return servico;
	}

	public Page<Servico> buscarPorParametros(String nomeCategoria, String nomeServico, int page, int size) {
		Page<Servico> servicos = persistencia.findByParams(nomeCategoria, nomeServico, PageRequest.of(page, size));
		return servicos;
	}

	public Page<Servico> buscarPorCategoria(String categoria, int page, int size) {
		Page<Servico> servicos = persistencia.findByArea(categoria, PageRequest.of(page, size));
		return servicos;
	}

	public Page<String> buscarCategorias(String categoria, int page, int size) {
		Page<String> servicos = persistencia.findCategorias(categoria, PageRequest.of(page, size));
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
