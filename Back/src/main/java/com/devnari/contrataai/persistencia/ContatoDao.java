package com.devnari.contrataai.persistencia;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devnari.contrataai.model.auxiliares.Contato;

public interface ContatoDao extends JpaRepository<Contato, Long> {

}
