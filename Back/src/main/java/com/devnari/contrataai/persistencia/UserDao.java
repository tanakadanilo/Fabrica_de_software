package com.devnari.contrataai.persistencia;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devnari.contrataai.model.User;

public interface UserDao extends JpaRepository<User, Integer>{

}
