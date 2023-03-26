package com.devnari.contrataai.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devnari.contrataai.model.auxiliares.Contato;

public interface ContatoDao extends JpaRepository<Contato, Integer> {

}
