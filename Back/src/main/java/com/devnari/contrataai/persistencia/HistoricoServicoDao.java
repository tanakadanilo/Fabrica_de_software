package com.devnari.contrataai.persistencia;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devnari.contrataai.model.HistoricoServico;

public interface HistoricoServicoDao extends JpaRepository<HistoricoServico, Integer> {

}
