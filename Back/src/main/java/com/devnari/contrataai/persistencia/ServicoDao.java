package com.devnari.contrataai.persistencia;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.devnari.contrataai.model.Servico;

@Repository
public interface ServicoDao extends JpaRepository<Servico, Integer> {

	List<Servico> findByArea(String categoria);

	@Query("select s from Servico s inner join Prestador p "
			+ "where (CASE WHEN :nomeCategoria like '_%' THEN s.area like %:nomeCategoria%  ELSE TRUE END) "
			+ "and  (CASE WHEN :nomeServico like '_%' THEN s.descricao like %:nomeServico%  ELSE TRUE END)")
	List<Servico> findByParams(@Param("nomeCategoria") String nomeCategoria, @Param("nomeServico") String nomeServico);
//	List<Servico> findByParams();
}
