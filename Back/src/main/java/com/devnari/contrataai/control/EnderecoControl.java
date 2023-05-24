package com.devnari.contrataai.control;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devnari.contrataai.model.auxiliares.Endereco;
import com.devnari.contrataai.services.EnderecoService;

@RestController
@RequestMapping("/endereco")
public class EnderecoControl {

	@Autowired
	EnderecoService service;
	
	@GetMapping("/{id}")
	public Endereco findById(@PathVariable Integer id) {
		return service.findById(id);
	}
	@GetMapping
	public List<Endereco >findAll() {
		return service.findAll();
	}
	
	@PostMapping
	public Endereco save(Endereco e) {
		return service.save(e);
	}
	
}
