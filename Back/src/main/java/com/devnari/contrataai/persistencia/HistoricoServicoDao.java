package com.devnari.contrataai.persistencia;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devnari.contrataai.model.HistoricoServico;
import com.devnari.contrataai.model.ServicoPrestado;

public interface HistoricoServicoDao extends JpaRepository<HistoricoServico, Integer> {

	@Query("Select SUM(h.avaliacao) from HistoricoServico h where h.avaliacao is not null and h.servico = :servico")
	Double calcularMediaNotasServico(@Param("servico")ServicoPrestado servicoPrestado);
	
	@Query("select h from HistoricoServico h where h.contratante.id = :id")
	List<HistoricoServico> listarPorContratante(@Param("id") Integer id);
	

	@Query("select h from HistoricoServico h where h.prestador.id = :id")
	List<HistoricoServico> listarPorPrestador(@Param("id") Integer id);
}
