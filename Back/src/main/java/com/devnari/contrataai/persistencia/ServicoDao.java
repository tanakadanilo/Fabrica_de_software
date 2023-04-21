package com.devnari.contrataai.persistencia;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devnari.contrataai.model.Servico;

@Repository
public interface ServicoDao extends JpaRepository<Servico, Integer> {

}
