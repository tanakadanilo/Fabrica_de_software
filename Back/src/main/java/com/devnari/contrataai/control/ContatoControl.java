package com.devnari.contrataai.control;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devnari.contrataai.base.Response;
import com.devnari.contrataai.model.auxiliares.Contato;
import com.devnari.contrataai.services.ContatoService;
import com.devnari.contrataai.util.StringUtil;

@RestController
@RequestMapping("/contato")
public class ContatoControl {

	@Autowired
	private ContatoService service;

	@GetMapping
	public ResponseEntity<Response<Page<Contato>>> buscarTodos(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size) {
		Response<Page<Contato>> response = new Response<>();
		try {
			Page<Contato> contatos = service.buscarTodos(page, size);
			response.setData(contatos);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Response<Contato>> buscarPorId(@PathVariable("id") String id) {
		Response<Contato> response = new Response<>();
		try {
			id = StringUtil.tratarStringNullEUndefinned(id);
			Long idLong = StringUtil.converterStringParaLong(id);
			Contato contato = service.buscarPorId(idLong);
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
			contato = service.salvar(contato);
			response.setData(contato);
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
