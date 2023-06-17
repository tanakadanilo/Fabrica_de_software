package com.devnari.contrataai.control;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devnari.contrataai.base.Response;
import com.devnari.contrataai.model.Contratante;
import com.devnari.contrataai.model.ServicoPrestado;
import com.devnari.contrataai.services.ContratanteService;
import com.devnari.contrataai.services.ServicoPrestadoService;
import com.devnari.contrataai.util.StringUtil;

@RestController
@RequestMapping(value = "/contratante")
public class ContratanteControl {

	@Autowired
	ContratanteService service;

	@Autowired
	ServicoPrestadoService servicoPrestadoService;

	@GetMapping(value = "")
	public ResponseEntity<Response<List<Contratante>>> buscarTodos() {
		Response<List<Contratante>> response = new Response<>();
		try {
			List<Contratante> contratantes = service.buscarTodos();
			response.setData(contratantes);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Response<Contratante>> buscarPorId(@PathVariable("id") String id) {
		Response<Contratante> response = new Response<>();
		try {
			Long idLong = StringUtil.converterStringParaLong(id);
			Contratante contratante = service.buscarPorId(idLong);
			response.setData(contratante);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@PostMapping(value = "")
	public ResponseEntity<Response<Contratante>> salvar(@RequestBody Contratante contratante) {
		Response<Contratante> response = new Response<>();
		try {
			contratante = service.salvar(contratante);
			response.setData(contratante);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		System.out.println(contratante);
		return ResponseEntity.ok(response);

	}

	// * receber na URL o id do serviço a ser contratado
	@PostMapping(value = "/contratar/{id}")
	public ResponseEntity<Response<Boolean>> contratarServico(@PathVariable Long id,
			@RequestBody Contratante contratante) {
		Response<Boolean> response = new Response<>();
		try {
			ServicoPrestado servicoPrestado = servicoPrestadoService.buscarPorId(id);
			service.contratarServico(contratante, servicoPrestado);
			response.setData(true);// * só retornar q deu certo
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);

	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Response<Contratante>> deletarPorId(@PathVariable("id") String id) {
		Response<Contratante> response = new Response<>();
		try {
			Long idLong = StringUtil.converterStringParaLong(id);
			Contratante contratante = service.buscarPorId(idLong);
			response.setData(contratante);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}
//	@PutMapping(value = "")
//	public ResponseEntity<Response<Contratante>> atualizarContratante(@RequestBody Contratante contratante) {
//
//		Response<Contratante> response = new Response<>();
//		try {
//			contratante = service.update(contratante);
//			response.setData(contratante);
//		} catch (Exception e) {
//			e.printStackTrace();
//			response.getErros().add(e.getMessage());
//		}
//		return ResponseEntity.ok(response);
//	}

}
