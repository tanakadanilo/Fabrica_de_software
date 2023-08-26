package com.devnari.contrataai.services;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.devnari.contrataai.model.Contratante;
import com.devnari.contrataai.model.HistoricoServico;
import com.devnari.contrataai.model.Prestador;
import com.devnari.contrataai.model.ServicoPrestado;
import com.devnari.contrataai.persistencia.ContratanteDao;
import com.devnari.contrataai.persistencia.HistoricoServicoDao;
import com.devnari.contrataai.persistencia.UserDao;
import com.devnari.contrataai.util.StringUtil;

@Service
public class ContratanteService {

	@Autowired
	private ContratanteDao persistencia;

	@Autowired
	private HistoricoServicoDao historicoServicoDao;

	@Autowired
	private PrestadorService prestadorService;

	@Autowired
	private UserDao userDao;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public Page<Contratante> buscarTodos(int page, int size) {
		Page<Contratante> contratantes = persistencia.findAll(PageRequest.of(page, size));
		return contratantes;
	}

	public Contratante buscarPorId(Long id) throws Exception {
		Contratante contratante = persistencia.findById(id).orElse(null);
		if (contratante == null) {
			throw new Exception("Contratante Não Encontrado!");
		}
		return contratante;
	}

	public Contratante buscarPorUsername(String nome) {
		nome = StringUtil.tratarStringNullEUndefinned(nome);
		Contratante contratante = persistencia.findByUsername(nome);
		return contratante;
	}

	public Page<Contratante> buscarPorNome(String nome, int page, int size) throws Exception {
		Page<Contratante> contratantes = persistencia.findByNome(nome, PageRequest.of(page, size));
		return contratantes;
	}

	public Page<Contratante> buscarPorCpf(String cpf, int page, int size) throws Exception {
		Page<Contratante> contratantes = persistencia.findByCpf(cpf, PageRequest.of(page, size));
		return contratantes;
	}

	public Contratante salvar(Contratante contratante) throws Exception {
		if (contratante == null) {
			throw new Exception("Contratante Não Informado!");
		}
		if (persistencia.findByCpfEquals(contratante.getCpf()) != null) {
			throw new Exception("CPF Já Cadastrado no Sistema");
		}
//		contratante.getUsuario().setPassword(passwordEncoder.encode(contratante.getUsuario().getPassword()));
//		userDao.save(contratante.getUsuario());
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
			historicoServicoDao.save(historico);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

}
