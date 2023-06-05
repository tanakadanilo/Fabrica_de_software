package com.devnari.contrataai.persistencia;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devnari.contrataai.model.Servico;

public interface ServicoDao extends JpaRepository<Servico, Long> {

	List<Servico> findByArea(String categoria);

	List<Servico> findByEspecialidade(String especialidade);

	@Query("SELECT s FROM Servico s INNER JOIN Prestador p "
			+ "WHERE (CASE WHEN :nomeCategoria like '_%' THEN s.area like %:nomeCategoria% ELSE TRUE END) "
			+ "AND (CASE WHEN :nomeServico like '_%' THEN s.descricao like %:nomeServico% ELSE TRUE END)")
	List<Servico> findByParams(@Param("nomeCategoria") String nomeCategoria, @Param("nomeServico") String nomeServico);

}
