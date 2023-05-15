package com.devnari.contrataai.persistencia;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devnari.contrataai.model.Usuario;

public interface UserDao extends JpaRepository<Usuario, Integer>{


	Optional<Usuario> findByUsername(String username);
}
