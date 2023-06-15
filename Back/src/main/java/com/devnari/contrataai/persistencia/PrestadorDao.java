package com.devnari.contrataai.persistencia;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devnari.contrataai.model.Prestador;

public interface PrestadorDao extends JpaRepository<Prestador, Long> {

	List<Prestador> findByNome(String nome);

	List<Prestador> findByCpf(String cpf);

	@Query("select prestador from Prestador prestador left join prestador.servicosPrestados servico where servico.id = :id")
	Prestador findPrestadorByServicoPrestado(@Param("id") Long id);
}
