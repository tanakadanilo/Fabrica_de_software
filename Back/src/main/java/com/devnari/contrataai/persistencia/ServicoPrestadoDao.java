package com.devnari.contrataai.persistencia;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devnari.contrataai.model.ServicoPrestado;
import com.devnari.contrataai.model.dto.ServicoPrestadoDto;

public interface ServicoPrestadoDao extends JpaRepository<ServicoPrestado, Long> {
	@Query("SELECT new com.devnari.contrataai.model.dto.ServicoPrestadoDto(s) "
			+ " FROM com.devnari.contrataai.model.ServicoPrestado s where s.id = :id")
	ServicoPrestadoDto findDtoById(@Param("id") Long id);
}
