package com.devnari.contrataai.control;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devnari.contrataai.base.Response;
import com.devnari.contrataai.model.auxiliares.Experiencia;
import com.devnari.contrataai.services.ExperienciaService;

@RestController
@RequestMapping("/experiencia")
public class ExperienciaControl {

	@Autowired
	ExperienciaService service;

	@GetMapping
	public ResponseEntity<Response<List<Experiencia>>> buscarTodos() {
		Response<List<Experiencia>> response = new Response<>();
		try {
			List<Experiencia> experiencias = service.findAll();
			response.setData(experiencias);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@PostMapping
	public ResponseEntity<Response<Experiencia>> salvar(@RequestBody Experiencia experiencia) {
		Response<Experiencia> response = new Response<>();
		try {
			experiencia = service.salvar(experiencia);
			response.setData(experiencia);
		} catch (Exception erro) {
			erro.printStackTrace();
			response.getErros().add(erro.getMessage());
		}
		return ResponseEntity.ok(response);
	}
}
