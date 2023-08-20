package com.devnari.contrataai.control;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devnari.contrataai.base.Response;
import com.devnari.contrataai.model.ServicoPrestado;
import com.devnari.contrataai.model.dto.ServicoPrestadoDto;
import com.devnari.contrataai.services.ServicoPrestadoService;
import com.devnari.contrataai.util.StringUtil;

@RestController
@RequestMapping(value = "/servicoprestado")
public class ServicoPrestadoControl {

	@Autowired
	ServicoPrestadoService service;

	@GetMapping(value = "")
	public ResponseEntity<Response<List<ServicoPrestado>>> buscarTodos() {
		Response<List<ServicoPrestado>> response = new Response<>();
		try {
			List<ServicoPrestado> servicosPrestados = service.buscarTodos();
			response.setData(servicosPrestados);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Response<ServicoPrestado>> buscarPorId(@PathVariable("id") String id) {
		Response<ServicoPrestado> response = new Response<>();
		try {
			Long idLong = StringUtil.converterStringParaLong(id);
			ServicoPrestado servicoPrestado = service.buscarPorId(idLong);
			response.setData(servicoPrestado);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@GetMapping(value = "/detail/{id}")
	public ResponseEntity<Response<ServicoPrestadoDto>> buscarDtoPorId(@PathVariable("id") String id) {
		Response<ServicoPrestadoDto> response = new Response<>();
		try {
			Long idLong = StringUtil.converterStringParaLong(id);
			ServicoPrestadoDto servicoPrestado = service.buscarDtoPorId(idLong);
			response.setData(servicoPrestado);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@PostMapping(value = "")
	public ResponseEntity<Response<ServicoPrestado>> adicionarServicoPrestado(
			@RequestBody ServicoPrestado servicoPrestado) {
		Response<ServicoPrestado> response = new Response<>();
		try {
			servicoPrestado = service.salvar(servicoPrestado);
			response.setData(servicoPrestado);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@PutMapping(value = "")
	public ResponseEntity<Response<ServicoPrestado>> atualizarServicoPrestado(
			@RequestBody ServicoPrestado servicoPrestado) {

		Response<ServicoPrestado> response = new Response<>();
		try {
			servicoPrestado = service.atualizar(servicoPrestado);
			response.setData(servicoPrestado);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Response<String>> deletarPorId(@PathVariable("id") String id) {
		Response<String> response = new Response<>();
		try {
			Long idLong = StringUtil.converterStringParaLong(id);
			String ret = service.deletarPorId(idLong);
			response.setData(ret);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}
}
