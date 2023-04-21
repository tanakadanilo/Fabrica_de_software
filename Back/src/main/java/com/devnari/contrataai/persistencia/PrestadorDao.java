package com.devnari.contrataai.persistencia;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devnari.contrataai.model.Prestador;

@Repository
public interface PrestadorDao extends JpaRepository<Prestador, Integer> {

}
