package com.devnari.contrataai.persistencia;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devnari.contrataai.model.ServicoPrestado;
import com.devnari.contrataai.model.dto.ServicoPrestadoDto;

public interface ServicoPrestadoDao extends JpaRepository<ServicoPrestado, Long> {
	@Query("SELECT new com.devnari.contrataai.model.dto.ServicoPrestadoDto("
			+ "s.id,s.servico.id, s.servico.area, s.servico.nome, s.servico.descricao,s.experiencia.id, s.experiencia.tempoExperiencia,"
			+ " s.experiencia.certificado, s.experiencia.descricaoAdcional, p) "
			+ " FROM com.devnari.contrataai.model.Prestador p join fetch p.servicosPrestados s where s.id = :id")
	ServicoPrestadoDto findDtoById(@Param("id") Long id);

	@Query("SELECT new com.devnari.contrataai.model.dto.ServicoPrestadoDto("
			+ "s.id,s.servico.id, s.servico.area, s.servico.nome, s.servico.descricao,s.experiencia.id, s.experiencia.tempoExperiencia,"
			+ " s.experiencia.certificado, s.experiencia.descricaoAdcional, p) "
			+ " FROM com.devnari.contrataai.model.Prestador p join fetch p.servicosPrestados s where s.id = :id")
	List<ServicoPrestadoDto> findDtoByIdPrestador(@Param("id") Long id);
}
