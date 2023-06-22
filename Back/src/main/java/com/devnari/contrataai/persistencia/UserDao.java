package com.devnari.contrataai.persistencia;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devnari.contrataai.model.Usuario;

public interface UserDao extends JpaRepository<Usuario, Long> {

	@Query("select usuario from Usuario usuario where usuario.username = :username")
	Optional<Usuario> findByUsername(@Param("username") String username);
}
