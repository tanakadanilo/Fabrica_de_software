package com.devnari.contrataai.control;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devnari.contrataai.base.Response;
import com.devnari.contrataai.model.auxiliares.Endereco;
import com.devnari.contrataai.services.EnderecoService;
import com.devnari.contrataai.util.StringUtil;

@RestController
@RequestMapping("/endereco")
public class EnderecoControl {

	@Autowired
	EnderecoService service;

	@GetMapping
	public ResponseEntity<Response<Page<Endereco>>> buscarTodos(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

		Response<Page<Endereco>> response = new Response<>();
		try {
			Page<Endereco> enderecos = service.buscarTodos(page, size);
			response.setData(enderecos);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Response<Endereco>> buscarPorId(@PathVariable String id) {

		Response<Endereco> response = new Response<>();
		try {
			Long idLong = StringUtil.converterStringParaLong(id);
			Endereco endereco = service.buscarPorId(idLong);
			response.setData(endereco);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@PostMapping
	public ResponseEntity<Response<Endereco>> salvar(Endereco endereco) {

		Response<Endereco> response = new Response<>();
		try {
			endereco = service.salvar(endereco);
			response.setData(endereco);
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
