package com.devnari.contrataai.persistencia;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devnari.contrataai.model.auxiliares.Experiencia;

public interface ExperienciaDao extends JpaRepository<Experiencia, Long> {

}
