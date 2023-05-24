package com.devnari.contrataai.persistencia;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devnari.contrataai.model.auxiliares.Disponibilidade;

public interface DisponibilidadeDao extends JpaRepository<Disponibilidade, Integer> {

}
