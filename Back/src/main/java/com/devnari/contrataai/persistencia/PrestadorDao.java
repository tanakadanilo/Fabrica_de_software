package com.devnari.contrataai.persistencia;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devnari.contrataai.model.Prestador;

public interface PrestadorDao extends JpaRepository<Prestador, Long> {

	@Query("select prestador from Prestador prestador")
	List<Prestador> findAll();

	@Query("select prestador from Prestador prestador where prestador.nome like %:nome%")
	List<Prestador> findByNome(@Param("nome") String nome);

	@Query("select prestador from Prestador prestador where prestador.usuario.username = :username")
	Prestador findByUsername(@Param("username") String username);

	@Query("select prestador from Prestador prestador where prestador.cpf like %:cpf%")
	List<Prestador> findByCpf(@Param("cpf") String cpf);

	@Query("select prestador from Prestador prestador left join prestador.servicosPrestados servico where servico.id = :id")
	Prestador findPrestadorByServicoPrestado(@Param("id") Long id);

	@Query("select prestador from Prestador prestador left join prestador.servicosPrestados.servico servico where servico.area = :area or  :area = '' ")
	List<Prestador> findPrestadorByCategoriaDoServicoPrestado(@Param("area") String area);

	@Query("select prestador from Prestador prestador join fetch prestador.servicosPrestados where prestador.id = :id")
	Prestador findByIdEager(@Param("id") Long id);
}
