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

import com.devnari.contrataai.model.Contratante;
import com.devnari.contrataai.model.ServicoPrestado;
import com.devnari.contrataai.services.ContratanteService;

@RestController
@RequestMapping(value = "/contratante")
public class ContratanteControl {

	@Autowired
	ContratanteService service;

	@GetMapping(value = "")
	public ResponseEntity<List<Contratante>> findAll() {
		return ResponseEntity.ok(service.findAll());
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Contratante> findById(@PathVariable("id") String id) {
		return ResponseEntity.ok(service.findById(Integer.parseInt(id)));
	}

	@PostMapping(value = "")
	public ResponseEntity<Contratante> addContratante(@RequestBody Contratante s) {
		return ResponseEntity.ok(service.add(s));
	}

	@PutMapping(value = "")
	public ResponseEntity<Contratante> updateContratante(@RequestBody Contratante s) {
		try {
			return ResponseEntity.ok(service.update(s));
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.notFound().build();
		}
	}
	
}
