package com.devnari.contrataai.persistencia;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devnari.contrataai.model.ServicoPrestado;

public interface ServicoPrestadoDao extends JpaRepository<ServicoPrestado, Long> {

}
