package com.devnari.contrataai.persistencia;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devnari.contrataai.model.auxiliares.Endereco;

public interface EnderecoDao extends JpaRepository<Endereco, Long> {

}
