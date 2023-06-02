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
import com.devnari.contrataai.model.Contratante;
import com.devnari.contrataai.services.ContratanteService;

@RestController
@RequestMapping(value = "/contratante")
public class ContratanteControl {

	@Autowired
	ContratanteService service;

	@GetMapping(value = "")
	public ResponseEntity<Response<List<Contratante>>> buscarTodos() {
		Response<List<Contratante>> response = new Response<>();
		try {
			List<Contratante> contratantes = service.findAll();
			response.setData(contratantes);
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
			Contratante contratante = service.findById(Integer.parseInt(id));
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
			contratante = service.add(contratante);
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
