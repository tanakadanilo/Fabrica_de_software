package com.devnari.contrataai.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devnari.contrataai.model.Contratante;
import com.devnari.contrataai.model.HistoricoServico;
import com.devnari.contrataai.model.Prestador;
import com.devnari.contrataai.model.ServicoPrestado;
import com.devnari.contrataai.persistencia.ContratanteDao;

@Service
public class ContratanteService {

	@Autowired
	ContratanteDao persistencia;

	@Autowired
	PrestadorService prestadorService;

	public List<Contratante> buscarTodos() {
		List<Contratante> contratantes = persistencia.findAll();
		return contratantes;
	}

	public Contratante buscarPorId(Long id) throws Exception {
		Contratante contratante = persistencia.findById(id).orElse(null);
		if (contratante == null) {
			throw new Exception("Contratante Não Encontrado!");
		}
		return contratante;
	}

	public List<Contratante> buscarPorNome(String nome) throws Exception {
		List<Contratante> contratantes = persistencia.findByNome(nome);
		return contratantes;
	}

	public List<Contratante> buscarPorCpf(String cpf) throws Exception {
		List<Contratante> contratantes = persistencia.findByCpf(cpf);
		return contratantes;
	}

	public Contratante salvar(Contratante contratante) throws Exception {
		if (contratante == null) {
			throw new Exception("Contratante Não Informado!");
		}
		if (persistencia.findByCpfEquals(contratante.getCpf()) != null) {
			throw new Exception("CPF Já Cadastrado no Sistema");
		}
		contratante.setId(null);
		return persistencia.save(contratante);
	}

	public Contratante atualizar(Contratante contratante) throws Exception {
		if (contratante.getId() == null) {
			throw new Exception("Contratante Não Encontrado!");
		}
		return persistencia.save(contratante);
	}

	public void contratarServico(Contratante contratante, ServicoPrestado servico) throws Exception {
		try {
			Prestador prestador = prestadorService.buscarPrestadorPorServicoPrestado(servico.getId());
			HistoricoServico historico = new HistoricoServico();
			historico.setContratante(contratante);
			historico.setDataContratacao(new Date());
			historico.setPrestador(prestador);
			historico.setServico(servico);

			contratante.getHistoricoServicosContratados().add(historico);
			prestador.getHistoricoServicosPrestados().add(historico);

			prestadorService.salvar(prestador);
			persistencia.save(contratante);

		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

}
