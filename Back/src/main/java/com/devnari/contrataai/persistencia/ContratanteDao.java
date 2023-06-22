package com.devnari.contrataai.persistencia;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devnari.contrataai.model.Contratante;
import com.devnari.contrataai.model.Prestador;

public interface ContratanteDao extends JpaRepository<Contratante, Long> {

	List<Contratante> findByNome(String nome);

	List<Contratante> findByCpf(String cpf);

	@Query("select contratante from Contratante contratante where contratante.usuario.username = :username")
	Contratante findByUsername(@Param("username") String userName);

	@Query("select contratante from Contratante contratante where contratante.cpf = :cpf")
	Contratante findByCpfEquals(@Param("cpf") String cpf);
}
