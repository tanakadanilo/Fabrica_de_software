package com.devnari.contrataai.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devnari.contrataai.model.Prestador;
import com.devnari.contrataai.model.Servico;

public interface ServicoDao extends JpaRepository<Servico, Integer> {

}
