package com.devnari.contrataai.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devnari.contrataai.model.HistoricoServico;
import com.devnari.contrataai.model.Prestador;
import com.devnari.contrataai.model.PropostaContratacao;
import com.devnari.contrataai.model.ServicoPrestado;
import com.devnari.contrataai.persistencia.HistoricoServicoDao;

@Service
public class HistoricoService {

	@Autowired
	HistoricoServicoDao historicoServicoDao;

	public HistoricoServico criarHistorico(PropostaContratacao propostaContratacao) {
		HistoricoServico historicoServico = new HistoricoServico(propostaContratacao.getPrestador(),
				propostaContratacao.getContratante(), propostaContratacao.getServicoPrestado(), new Date(),
				propostaContratacao.getDataContratacao(), null);

		return historicoServicoDao.save(historicoServico);
	}

	public void avaliarServico(HistoricoServico historicoServico, Double nota) {
		historicoServico.setAvaliacao(nota);
		historicoServicoDao.save(historicoServico);
	}

	public List<HistoricoServico> listarHistoricos(Integer idContratante) {
		return (historicoServicoDao.listarPorContratante(idContratante));
	}

	public Double calcularMediaNotas(ServicoPrestado servicoPrestado) {
		return historicoServicoDao.calcularMediaNotasServico(servicoPrestado);
	}
	
	public Double calcularMediaNotas(Prestador prestador) {
		Double[] media = {0.0};
		prestador.getServicosPrestados().forEach(x->{
			media[0] +=historicoServicoDao.calcularMediaNotasServico(x)==null? 0:historicoServicoDao.calcularMediaNotasServico(x); 
		});
		if(media[0] != 0) {
			System.out.println(media[0]);
		}
		return media[0];
	}
}
