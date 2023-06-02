package com.devnari.contrataai.control;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devnari.contrataai.base.Response;
import com.devnari.contrataai.model.auxiliares.Contato;
import com.devnari.contrataai.services.ContatoService;

@RestController
@RequestMapping("/contato")
public class ContatoControl {

	@Autowired
	private ContatoService service;

	@GetMapping
	public ResponseEntity<Response<List<Contato>>> buscarTodos() {
		Response<List<Contato>> response = new Response<>();
		try {
			List<Contato> contatos = service.findAll();
			response.setData(contatos);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@GetMapping("{id}")
	public ResponseEntity<Response<Contato>> buscarPorId(@PathVariable("id") Integer id) {
		Response<Contato> response = new Response<>();
		try {
			Contato contato = service.findById(id);
			response.setData(contato);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@PostMapping
	public ResponseEntity<Response<Contato>> salvar(@RequestBody Contato contato) {
		Response<Contato> response = new Response<>();
		try {
			contato = service.save(contato);
			response.setData(contato);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}
}
