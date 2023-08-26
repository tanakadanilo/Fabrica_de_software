package com.devnari.contrataai.persistencia;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devnari.contrataai.model.Prestador;

public interface PrestadorDao extends JpaRepository<Prestador, Long> {

	@Query("select prestador from Prestador prestador")
	Page<Prestador> findAll(Pageable pageable);
	
	@Query("select prestador from Prestador prestador where prestador.nome like %:nome%")
	Page<Prestador> findByNome(@Param("nome") String nome, Pageable pageable);

	@Query("select prestador from Prestador prestador where prestador.usuario.username = :username")
	Prestador findByUsername(@Param("username") String username);

	@Query("select prestador from Prestador prestador where prestador.cpf like %:cpf%")
	Page<Prestador> findByCpf(@Param("cpf") String cpf, Pageable pageable);

	@Query("select prestador from Prestador prestador left join prestador.servicosPrestados servico where servico.id = :id")
	Prestador findPrestadorByServicoPrestado(@Param("id") Long id);
}
