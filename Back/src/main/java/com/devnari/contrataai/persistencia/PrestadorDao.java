package com.devnari.contrataai.persistencia;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devnari.contrataai.model.Prestador;

public interface PrestadorDao extends JpaRepository<Prestador, Long> {

	List<Prestador> findByNome(String nome);

	List<Prestador> findByCpf(String cpf);
}
