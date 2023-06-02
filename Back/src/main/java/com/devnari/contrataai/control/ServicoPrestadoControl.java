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

import com.devnari.contrataai.base.Response;
import com.devnari.contrataai.model.ServicoPrestado;
import com.devnari.contrataai.services.ServicoPrestadoService;

@RestController
@RequestMapping(value = "/servicoprestado")
public class ServicoPrestadoControl {

	@Autowired
	ServicoPrestadoService service;

	@GetMapping(value = "")
	public ResponseEntity<Response<List<ServicoPrestado>>> findAll() {
		Response<List<ServicoPrestado>> response = new Response<>();
		try {
			List<ServicoPrestado> servicosPrestados = service.findAll();
			response.setData(servicosPrestados);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Response<ServicoPrestado>> findById(@PathVariable("id") String id) {
		Response<ServicoPrestado> response = new Response<>();
		try {
			ServicoPrestado servicoPrestado = service.findById(Integer.parseInt(id));
			response.setData(servicoPrestado);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@PostMapping(value = "")
	public ResponseEntity<Response<ServicoPrestado>> addServicoPrestado(@RequestBody ServicoPrestado s) {
		Response<ServicoPrestado> response = new Response<>();
		try {
			ServicoPrestado servicoPrestado = service.save(s);
			response.setData(servicoPrestado);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@PutMapping(value = "")
	public ResponseEntity<Response<ServicoPrestado>> updateServicoPrestado(@RequestBody ServicoPrestado s) {

		Response<ServicoPrestado> response = new Response<>();
		try {
			ServicoPrestado servicoPrestado = service.update(s);
			response.setData(servicoPrestado);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}
}
