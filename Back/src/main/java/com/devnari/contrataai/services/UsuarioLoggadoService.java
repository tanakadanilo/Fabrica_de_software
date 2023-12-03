package com.devnari.contrataai.services;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.devnari.contrataai.configurations.JwtTokenFilter;
import com.devnari.contrataai.model.Usuario;
import com.devnari.contrataai.model.UsuarioLoggado;
import com.devnari.contrataai.persistencia.UserDao;

@Service
public class UsuarioLoggadoService implements UserDetailsService {

	private static Long tempoExpiracaoDoToken = 60L * 60L * 1000L;
	@Autowired
	private UserDao userDao;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private PrestadorService prestadorService;
	@Autowired
	private ContratanteService contratanteService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<Usuario> user = userDao.findByUsername(username);
		if (user.isEmpty()) {
			throw new UsernameNotFoundException("Usuário ou senha inválidos!");
		}
		return getUsuarioLoggadoPorUsuario(user.get());
	}

	public UsuarioLoggado getUsuarioLoggadoPorUsuario(Usuario usuario) {
		return new UsuarioLoggado(usuario);
	}

	public String login(String username, String password) throws Exception {
		UsuarioLoggado usuario = (UsuarioLoggado) loadUserByUsername(username);
		if (passwordEncoder.matches(password, usuario.getPassword())) {
			String token = JWT.create().withSubject(usuario.getPassword()).withIssuer(usuario.getUsername())
					.withExpiresAt(new Date(System.currentTimeMillis() + tempoExpiracaoDoToken))
					.sign(Algorithm.HMAC512(JwtTokenFilter.SECRET.getBytes()));
			return token;
		} else {
			throw new Exception("Usuário ou senha inválidos!");
		}
	}

	public UsuarioLoggado findByToken(String token) throws Exception {
		Usuario usuario = new Usuario();
		DecodedJWT ret = JWT.decode(token);
		String username = ret.getIssuer();
		String password = ret.getSubject();
		usuario = userDao.findByUsername(username).orElse(null);
		if (usuario == null || !usuario.getPassword().equals(password)) {
			throw new Exception("Token Inválido!");
		}
		UsuarioLoggado usuarioLoggado = new UsuarioLoggado(usuario);
		if (usuario.getPrestador()) {
			usuarioLoggado.setPessoa(prestadorService.buscarPorUsername(usuarioLoggado.getUsername()));
		} else {
			usuarioLoggado.setPessoa(contratanteService.buscarPorUsername(usuarioLoggado.getUsername()));
		}
		usuarioLoggado.setToken(token);
		if (usuarioLoggado.isAccountNonExpired()) {
			return usuarioLoggado;
		} else {
			throw new Exception("Login expirado!");
		}

	}

	public Usuario save(Usuario usuario) {

		usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
		return userDao.save(usuario);
	}

	public Page<Usuario> findAll(int page, int size) {
		return userDao.findAll(PageRequest.of(page, size));
	}

}
