package com.devnari.contrataai.persistencia;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devnari.contrataai.model.auxiliares.Contato;

@Repository
public interface ContatoDao extends JpaRepository<Contato, Integer> {

}
