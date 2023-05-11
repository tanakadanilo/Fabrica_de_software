package com.devnari.contrataai.persistencia;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devnari.contrataai.model.User;

public interface UserDao extends JpaRepository<User, Integer> {

	@Query(value = "SELECT * FROM users WHERE users.username like :login limit 1", nativeQuery = true)
	User findByLogin(@Param("login") String login);
}
