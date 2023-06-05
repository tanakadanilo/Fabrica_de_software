package com.devnari.contrataai.persistencia;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devnari.contrataai.model.Contratante;

public interface ContratanteDao extends JpaRepository<Contratante, Long> {

	List<Contratante> findByNome(String nome);

	List<Contratante> findByCpf(String cpf);
}
