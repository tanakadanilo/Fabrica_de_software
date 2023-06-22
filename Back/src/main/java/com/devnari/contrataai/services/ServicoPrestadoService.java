package com.devnari.contrataai.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devnari.contrataai.model.ServicoPrestado;
import com.devnari.contrataai.persistencia.ServicoPrestadoDao;

@Service
public class ServicoPrestadoService {

	@Autowired
	ServicoPrestadoDao persistencia;
	@Autowired
	ServicoService servicoService;
	@Autowired
	ExperienciaService experienciaService;

	public List<ServicoPrestado> buscarTodos() {
		return persistencia.findAll();
	}

	public ServicoPrestado buscarPorId(Long id) throws Exception {
		ServicoPrestado servicoPrestado = persistencia.findById(id).orElse(null);
		if (servicoPrestado == null) {
			throw new Exception("Serviço Prestado Não Encontrado!");
		}

		return servicoPrestado;
	}

	public ServicoPrestado salvar(ServicoPrestado servicoPrestado) throws Exception {
		if (servicoPrestado == null) {
			throw new Exception("Serviço Prestado Não Informado!");
		}
		servicoPrestado.setId(null);
		return persistencia.save(servicoPrestado);
	}

	public ServicoPrestado atualizar(ServicoPrestado servicoPrestado) throws Exception {
		if (servicoPrestado.getId() == null) {
			throw new Exception("Serviço Prestado Não Encontrado!");
		}
		return persistencia.save(servicoPrestado);
	}

	public String deletarPorId(Long id) throws Exception {
		if (!persistencia.existsById(id)) {
			throw new Exception("Não Encontrado!");
		}
		persistencia.deleteById(id);
		return "deletado Com Sucesso!";
	}
	

}
