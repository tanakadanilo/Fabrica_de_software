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
import com.devnari.contrataai.model.Contratante;
import com.devnari.contrataai.services.ContratanteService;
import com.devnari.contrataai.services.ServicoPrestadoService;
import com.devnari.contrataai.util.StringUtil;

import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping(value = "/contratante")
public class ContratanteControl {

	@Autowired
	ContratanteService service;

	@Autowired
	ServicoPrestadoService servicoPrestadoService;

	@GetMapping(value = "")
	public ResponseEntity<Response<Page<Contratante>>> buscarTodos(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size) {
		Response<Page<Contratante>> response = new Response<>();
		try {
			Page<Contratante> contratantes = service.buscarTodos(page, size);
			response.setData(contratantes);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@GetMapping(value = "/nome={nome}")
	public ResponseEntity<Response<Page<Contratante>>> buscarPorNome(@PathVariable("nome") String nome,
			@PathParam("page") Integer page, @PathParam("size") Integer size) {
		Response<Page<Contratante>> response = new Response<>();
		try {
			Page<Contratante> contratante = service.buscarPorNome(nome, page, size);
			response.setData(contratante);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Response<Contratante>> buscarPorId(@PathVariable("id") String id) {
		Response<Contratante> response = new Response<>();
		try {
			Long idLong = StringUtil.converterStringParaLong(id);
			Contratante contratante = service.buscarPorId(idLong);
			response.setData(contratante);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@PostMapping(value = "")
	public ResponseEntity<Response<Contratante>> salvar(@RequestBody Contratante contratante) {
		Response<Contratante> response = new Response<>();
		try {
			response.setData(contratante);
			contratante = service.salvar(contratante);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		System.out.println(contratante);
		return ResponseEntity.ok(response);

	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Response<Contratante>> deletarPorId(@PathVariable("id") String id) {
		Response<Contratante> response = new Response<>();
		try {
			Long idLong = StringUtil.converterStringParaLong(id);
			Contratante contratante = service.buscarPorId(idLong);
			response.setData(contratante);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}
//	@PutMapping(value = "")
//	public ResponseEntity<Response<Contratante>> atualizarContratante(@RequestBody Contratante contratante) {
//
//		Response<Contratante> response = new Response<>();
//		try {
//			contratante = service.update(contratante);
//			response.setData(contratante);
//		} catch (Exception e) {
//			e.printStackTrace();
//			response.getErros().add(e.getMessage());
//		}
//		return ResponseEntity.ok(response);
//	}

}
