package com.devnari.contrataai.control;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devnari.contrataai.base.Response;
import com.devnari.contrataai.model.Prestador;
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
	public ResponseEntity<Response<List<Prestador>>> buscarTodos() {
		Response<List<Prestador>> response = new Response<>();
		try {
			List<Prestador> prestadores = service.findAll();
			response.setData(prestadores);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Response<Prestador>> findById(@PathVariable("id") String id) {
		Response<Prestador> response = new Response<>();
		try {
			Prestador prestador = service.findById(Integer.parseInt(id));
			response.setData(prestador);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@PostMapping(value = "")
	public ResponseEntity<Response<Prestador>> addPrestador(@RequestBody Prestador p) {

		Response<Prestador> response = new Response<>();
		try {
			Prestador prestador = service.save(p);
			response.setData(prestador);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@PostMapping(value = "/novoservico")
	public ResponseEntity<Response<ServicoPrestado>> addServico(@RequestBody ServicoPrestado s) {

		Response<ServicoPrestado> response = new Response<>();
		try {
			ServicoPrestado servicoPrestado = servicoPrestadoService.save(s);
			response.setData(servicoPrestado);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@PostMapping(value = "/adicionarservico")
	public ResponseEntity<Response<Prestador>> adicionarServico(@RequestBody Map<String, String> params) {
		Response<Prestador> response = new Response<>();
		try {
			Integer idPrestador = Integer.parseInt(params.get("idPrestador"));
			Integer idServico = Integer.parseInt(params.get("idServico"));
			Prestador prestador = service.adicionarServico(idPrestador, idServico);
			response.setData(prestador);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@PutMapping(value = "")
	public ResponseEntity<Response<Prestador>> updatePrestador(@RequestBody Prestador s) {
		Response<Prestador> response = new Response<>();
		try {
			Prestador prestador = service.update(s);
			response.setData(prestador);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}
}
