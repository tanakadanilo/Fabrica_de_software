package com.devnari.contrataai.control;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

@RestController
@RequestMapping(value = "/servico")
public class ServicoControl {

	@Autowired
	ServicoService service;

	@GetMapping(value = "")
	public ResponseEntity<Response<List<Servico>>> findAll(
			@RequestParam(value = "nomeCategoria", required = false, defaultValue = "") String nomeCategoria,
			@RequestParam(value = "nomeServico", required = false, defaultValue = "") String nomeServico) {
		Response<List<Servico>> response = new Response<>();
		try {
			List<Servico> servicos = service.findByParams(nomeCategoria, nomeServico);
			response.setData(servicos);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Response<Servico>> findById(@PathVariable("id") String id) {
		Response<Servico> response = new Response<>();
		try {
			Servico servico = service.findById(Integer.parseInt(id));
			response.setData(servico);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@PostMapping(value = "")
	public ResponseEntity<Response<Servico>> addServico(@RequestBody Servico s) {
		Response<Servico> response = new Response<>();
		try {
			Servico servico = service.add(s);
			response.setData(servico);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@PutMapping(value = "")
	public ResponseEntity<Response<Servico>> updateServico(@RequestBody Servico s) {
		Response<Servico> response = new Response<>();
		try {
			Servico servico = service.update(s);
			response.setData(servico);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}
}
