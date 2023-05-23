package com.devnari.contrataai.persistencia;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devnari.contrataai.model.auxiliares.Experiencia;

@Repository
public interface ExperienciaDao extends JpaRepository<Experiencia, Integer> {

}
