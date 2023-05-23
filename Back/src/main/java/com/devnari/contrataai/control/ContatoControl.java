package com.devnari.contrataai.control;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devnari.contrataai.model.auxiliares.Contato;
import com.devnari.contrataai.services.ContatoService;

@RestController
@RequestMapping("/contato")
public class ContatoControl {

	@Autowired
	private ContatoService service;

	@GetMapping
	public List<Contato> findAll() {
		return service.findAll();
	}

	@GetMapping("{id}")
	public Contato findbyId(@PathVariable("id") Integer id) {
		return service.findById(id);
	}

	@PostMapping
	public Contato save(@RequestBody Contato c) {
		return service.save(c);
	}
}
