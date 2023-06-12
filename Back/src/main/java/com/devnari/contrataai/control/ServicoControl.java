package com.devnari.contrataai.control;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devnari.contrataai.base.Response;
import com.devnari.contrataai.model.Servico;
import com.devnari.contrataai.services.ServicoService;
import com.devnari.contrataai.util.StringUtil;

@RestController
@RequestMapping(value = "/servico")
public class ServicoControl {

	@Autowired
	ServicoService service;

	@GetMapping(value = "")
	public ResponseEntity<Response<List<Servico>>> buscarTodos(
			@RequestParam(value = "nomeCategoria", required = false, defaultValue = "") String nomeCategoria,
			@RequestParam(value = "nomeServico", required = false, defaultValue = "") String nomeServico) {
		Response<List<Servico>> response = new Response<>();
		try {
			List<Servico> servicos = service.buscarPorParametros(nomeCategoria, nomeServico);
			response.setData(servicos);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Response<Servico>> buscarPorId(@PathVariable("id") String id) {
		Response<Servico> response = new Response<>();
		try {
			Long idLong = StringUtil.converterStringParaLong(id);
			Servico servico = service.buscarPorId(idLong);
			response.setData(servico);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@GetMapping(value = "/categorias")
	public ResponseEntity<Response<List<String>>> listarCategorias(
			@RequestParam(name = "categoria", required = false, defaultValue = "") String categoria) {
		Response<List<String>> response = new Response<>();
		try {
			List<String> categorias = service.buscarCategorias(categoria);
			response.setData(categorias);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@PostMapping(value = "")
	public ResponseEntity<Response<Servico>> adicionarServico(@RequestBody Servico servico) {
		Response<Servico> response = new Response<>();
		try {
			servico = service.salvar(servico);
			response.setData(servico);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@PutMapping(value = "")
	public ResponseEntity<Response<Servico>> atualizarServico(@RequestBody Servico servico) {
		Response<Servico> response = new Response<>();
		try {
			servico = service.atualizar(servico);
			response.setData(servico);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Response<String>> deletarPorId(@PathVariable("id") String id) {
		Response<String> response = new Response<>();
		try {
			Long idLong = StringUtil.converterStringParaLong(id);
			String ret = service.deletarPorId(idLong);
			response.setData(ret);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}
}
