package com.devnari.contrataai.control;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devnari.contrataai.base.Response;
import com.devnari.contrataai.model.auxiliares.Experiencia;
import com.devnari.contrataai.services.ExperienciaService;
import com.devnari.contrataai.util.StringUtil;

@RestController
@RequestMapping("/experiencia")
public class ExperienciaControl {

	@Autowired
	ExperienciaService service;

	@GetMapping
	public ResponseEntity<Response<List<Experiencia>>> buscarTodos() {
		Response<List<Experiencia>> response = new Response<>();
		try {
			List<Experiencia> experiencias = service.buscarTodos();
			response.setData(experiencias);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Response<Experiencia>> buscarPorId(String id) {
		Response<Experiencia> response = new Response<>();
		try {
			Long idLong = StringUtil.converterStringParaLong(id);
			Experiencia experiencia = service.buscarPorId(idLong);
			response.setData(experiencia);
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
