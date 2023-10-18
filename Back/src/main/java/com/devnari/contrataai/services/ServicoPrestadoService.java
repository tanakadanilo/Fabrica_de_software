package com.devnari.contrataai.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.devnari.contrataai.model.ServicoPrestado;
import com.devnari.contrataai.model.dto.ServicoPrestadoDto;
import com.devnari.contrataai.persistencia.PrestadorDao;
import com.devnari.contrataai.persistencia.ServicoPrestadoDao;

@Service
public class ServicoPrestadoService {
	@Autowired
	PrestadorDao prestadorDao;
	@Autowired
	ServicoPrestadoDao persistencia;
	@Autowired
	ServicoService servicoService;
	@Autowired
	ExperienciaService experienciaService;

	public Page<ServicoPrestado> buscarTodos(int page, int size) {
		return persistencia.findAll(PageRequest.of(page, size));
	}

	public ServicoPrestado buscarPorId(Long id) throws Exception {
		ServicoPrestado servicoPrestado = persistencia.findById(id).orElse(null);
		if (servicoPrestado == null) {
			throw new Exception("Serviço Prestado Não Encontrado!");
		}

		return servicoPrestado;
	}

	public List<ServicoPrestadoDto> buscarDtosPorIdPrestador(Long id) throws Exception {
		List<ServicoPrestadoDto> servicoPrestado = persistencia.findDtoByIdPrestador(id);
		if (servicoPrestado == null) {
			throw new Exception("Serviço Prestado Não Encontrado!");
		}

		return servicoPrestado;
	}

	public ServicoPrestadoDto buscarDtoPorId(Long id) throws Exception {
		try {
			ServicoPrestadoDto servicoPrestadoDto = new ServicoPrestadoDto(persistencia.findById(id).orElse(null),
					null);

			servicoPrestadoDto
					.adicionarDadosPrestador(prestadorDao.findPrestadorByServicoPrestado(servicoPrestadoDto.getId()));

			return servicoPrestadoDto;
		} catch (Exception e) {
			throw new Exception("Serviço Prestado Não Encontrado!");
		}
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
