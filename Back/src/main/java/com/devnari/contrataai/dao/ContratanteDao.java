package com.devnari.contrataai.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devnari.contrataai.model.Contratante;

public interface ContratanteDao extends JpaRepository<Contratante, Integer> {

}
