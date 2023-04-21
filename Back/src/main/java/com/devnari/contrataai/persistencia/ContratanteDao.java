package com.devnari.contrataai.persistencia;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devnari.contrataai.model.Contratante;

@Repository
public interface ContratanteDao extends JpaRepository<Contratante, Integer> {

}
