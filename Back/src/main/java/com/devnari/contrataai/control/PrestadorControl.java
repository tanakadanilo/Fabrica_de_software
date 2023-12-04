package com.devnari.contrataai.control;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devnari.contrataai.base.Response;
import com.devnari.contrataai.model.Prestador;
import com.devnari.contrataai.model.ServicoPrestado;
import com.devnari.contrataai.services.HistoricoService;
import com.devnari.contrataai.services.PrestadorService;
import com.devnari.contrataai.services.ServicoPrestadoService;
import com.devnari.contrataai.util.StringUtil;

@RestController
@RequestMapping(value = "/prestador")
public class PrestadorControl {

	@Autowired
	PrestadorService service;
	
	@Autowired
	HistoricoService historicoService;
	
	@Autowired
	ServicoPrestadoService servicoPrestadoService;

	@GetMapping(value = "")
	public ResponseEntity<Response<Page<Prestador>>> buscarTodos(@RequestParam(defaultValue = "") String categoria,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "100") int size) {
		Response<Page<Prestador>> response = new Response<>();
		try {
			Page<Prestador> prestadores = service.buscarPorCategoria(categoria, page, size);
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
			Long idLong = StringUtil.converterStringParaLong(id);
			Prestador prestador = service.buscarPorId(idLong);
			response.setData(prestador);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}
	@GetMapping(value = "/nota/{id}")
	public ResponseEntity<Response<Double>> findNotaById(@PathVariable("id") String id) {
		Response<Double> response = new Response<>();
		try {
			Long idLong = StringUtil.converterStringParaLong(id);
			Prestador prestador = service.buscarPorId(idLong);
			Double notaMedia = this.historicoService.calcularMediaNotas(prestador);
			response.setData(notaMedia);
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
			Prestador prestador = service.salvar(p);
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
			ServicoPrestado servicoPrestado = servicoPrestadoService.salvar(s);
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
			Long idPrestador = StringUtil.converterStringParaLong(params.get("idPrestador"));
			Long idServico = StringUtil.converterStringParaLong(params.get("idServico"));
			Prestador prestador = service.adicionarServico(idPrestador, idServico);
			response.setData(prestador);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@PutMapping(value = "")
	public ResponseEntity<Response<Prestador>> updatePrestador(@RequestBody Prestador prestador) {
		Response<Prestador> response = new Response<>();
		try {
			prestador = service.atualizar(prestador);
			response.setData(prestador);
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
