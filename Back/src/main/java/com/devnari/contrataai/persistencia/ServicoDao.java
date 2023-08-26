package com.devnari.contrataai.persistencia;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devnari.contrataai.model.Servico;

public interface ServicoDao extends JpaRepository<Servico, Long> {

	@Query("SELECT s from Servico s " + "where (:categoria = '' or s.area like %:categoria%)")
	Page<Servico> findByArea(@Param("categoria") String categoria, Pageable pageable);

	@Query("SELECT distinct s.area from Servico s " + "where (:categoria like '' or s.area like %:categoria%)")
	Page<String> findCategorias(@Param("categoria") String categoria, Pageable pageable);

	Page<Servico> findByEspecialidade(String especialidade, Pageable pageable);

	@Query("SELECT s FROM Servico s INNER JOIN Prestador p "
			+ "WHERE (CASE WHEN :nomeCategoria like '_%' THEN s.area like %:nomeCategoria% ELSE TRUE END) "
			+ "AND (CASE WHEN :nomeServico like '_%' THEN s.descricao like %:nomeServico% ELSE TRUE END)")
	Page<Servico> findByParams(@Param("nomeCategoria") String nomeCategoria, @Param("nomeServico") String nomeServico,
			Pageable pageable);

}
