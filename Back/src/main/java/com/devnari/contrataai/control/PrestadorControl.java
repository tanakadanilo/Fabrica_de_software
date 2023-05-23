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
import org.springframework.web.bind.annotation.RestController;

import com.devnari.contrataai.model.Prestador;
import com.devnari.contrataai.model.Servico;
import com.devnari.contrataai.model.ServicoPrestado;
import com.devnari.contrataai.services.PrestadorService;
import com.devnari.contrataai.services.ServicoPrestadoService;

@RestController
@RequestMapping(value = "/prestador")
public class PrestadorControl {

	@Autowired
	PrestadorService service;
	@Autowired
	ServicoPrestadoService servicoPrestadoService;

	@GetMapping(value = "")
	public ResponseEntity<List<Prestador>> findAll() {
		return ResponseEntity.ok(service.findAll());
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Prestador> findById(@PathVariable("id") String id) {
		return ResponseEntity.ok(service.findById(Integer.parseInt(id)));
	}

	@PostMapping(value = "")
	public ResponseEntity<Prestador> addPrestador(@RequestBody Prestador p) {
		return ResponseEntity.ok(service.add(p));
	}

	@PostMapping(value = "/novoservico")
	public ResponseEntity<ServicoPrestado> addServico(@RequestBody ServicoPrestado s) {
		return ResponseEntity.ok(servicoPrestadoService.add(s));
	}

	@PutMapping(value = "")
	public ResponseEntity<Prestador> updatePrestador(@RequestBody Prestador s) {
		try {
			return ResponseEntity.ok(service.update(s));
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.notFound().build();
		}
	}
}
