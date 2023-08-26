package com.devnari.contrataai.persistencia;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devnari.contrataai.model.Contratante;

public interface ContratanteDao extends JpaRepository<Contratante, Long> {

	@Query("select contratante from Contratante contratante where contratante.nome like %:nome%")
	Page<Contratante> findByNome(@Param("nome") String nome, Pageable pageable);

	@Query("select contratante from Contratante contratante where contratante.nome like %:cpf%")
	Page<Contratante> findByCpf(@Param("cpf") String cpf, Pageable pageable);

	@Query("select contratante from Contratante contratante where contratante.usuario.username = :username")
	Contratante findByUsername(@Param("username") String userName);

	@Query("select contratante from Contratante contratante where contratante.cpf = :cpf")
	Contratante findByCpfEquals(@Param("cpf") String cpf);
}
