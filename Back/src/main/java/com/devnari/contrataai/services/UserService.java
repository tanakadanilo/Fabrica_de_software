package com.devnari.contrataai.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devnari.contrataai.model.User;
import com.devnari.contrataai.persistencia.UserDao;

@Service
public class UserService {

	@Autowired
	UserDao dao;

	public User findByLogin(String login) {
		return dao.findByLogin(login);
	}

	public List<User> findAll() {
		return dao.findAll();
	}

	public User save(User user) {
		return dao.save(user);
	}
}
