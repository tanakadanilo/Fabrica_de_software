package com.devnari.contrataai.control;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devnari.contrataai.base.Response;
import com.devnari.contrataai.model.PropostaContratacao;
import com.devnari.contrataai.model.ServicoPrestado;
import com.devnari.contrataai.services.ContratarService;

@RestController
@RequestMapping("/contratar")
public class Contratacao {

	@Autowired
	private ContratarService service;

	@PostMapping(value = "")
	public ResponseEntity<Response<String>> adicionarServicoPrestado(
			@RequestBody PropostaContratacao propostaContratacao) {
		Response<String> response = new Response<>();
		try {
			service.enviarProposta(propostaContratacao);
			response.setData("Proposta enviada");
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

}
