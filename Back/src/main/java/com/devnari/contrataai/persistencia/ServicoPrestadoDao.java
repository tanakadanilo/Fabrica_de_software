package com.devnari.contrataai.persistencia;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devnari.contrataai.model.ServicoPrestado;

@Repository
public interface ServicoPrestadoDao extends JpaRepository<ServicoPrestado, Integer> {

}
