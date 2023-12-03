package com.devnari.contrataai.control;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devnari.contrataai.base.Response;
import com.devnari.contrataai.model.HistoricoServico;
import com.devnari.contrataai.model.PropostaContratacao;
import com.devnari.contrataai.services.ContratarService;
import com.devnari.contrataai.services.HistoricoService;

@RestController
@RequestMapping("/contratar")
public class Contratacao {

	@Autowired
	private ContratarService service;

	@Autowired
	private HistoricoService historicoService;

	@PostMapping(value = "")
	public ResponseEntity<Response<HistoricoServico>> contratar(@RequestBody PropostaContratacao propostaContratacao) {
		Response<HistoricoServico> response = new Response<>();
		try {
			service.enviarProposta(propostaContratacao);
			response.setData(historicoService.criarHistorico(propostaContratacao));
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@PostMapping(value = "/avaliar")
	public ResponseEntity<Response<HistoricoServico>> contratar(@RequestBody HistoricoServico historicoServico,
			@RequestParam("nota") Double nota) {
		Response<HistoricoServico> response = new Response<>();
		try {

			historicoService.avaliarServico(historicoServico, nota);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}
	@GetMapping()
	public ResponseEntity<Response<List<HistoricoServico>>> 
	listarHistoricos(@RequestParam("idContratante") Integer idContratante) {
		Response<List<HistoricoServico>> response = new Response<>();
		try {
			response.setData(historicoService.listarHistoricos(idContratante));
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

}
