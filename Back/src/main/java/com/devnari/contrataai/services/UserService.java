package com.devnari.contrataai.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.devnari.contrataai.model.Usuario;
import com.devnari.contrataai.persistencia.UserDao;

@Service
public class UserService implements UserDetailsService {

	@Autowired
	private UserDao userDao;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<Usuario> user = userDao.findByUsername(username);
		if (user.isEmpty()) {
			throw new UsernameNotFoundException("usuário não encontrado");
		}
		return user.get();
	}

	
	public Usuario save(Usuario usuario) {
		usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
		return userDao.save(usuario);
	}

	public List<Usuario> findAll() {
		return userDao.findAll();
	}

}
