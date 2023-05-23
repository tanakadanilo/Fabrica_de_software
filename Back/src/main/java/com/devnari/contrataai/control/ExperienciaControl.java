package com.devnari.contrataai.control;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devnari.contrataai.model.auxiliares.Experiencia;
import com.devnari.contrataai.services.ExperienciaService;

@RestController
@RequestMapping("/experiencia")
public class ExperienciaControl {

	@Autowired
	ExperienciaService service;

	@GetMapping
	public ResponseEntity<List<Experiencia>> findAll() {
		return ResponseEntity.ok(service.findAll());
	}

	@PostMapping
	public ResponseEntity<Experiencia> save(@RequestBody Experiencia e) {
		return ResponseEntity.ok(service.salvar(e));
	}
}
