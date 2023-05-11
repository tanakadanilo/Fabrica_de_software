package com.devnari.contrataai.control;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devnari.contrataai.model.User;
import com.devnari.contrataai.services.TokenService;
import com.devnari.contrataai.services.UserService;

@RestController
@RequestMapping("/login")
public class LoginControl {

	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private UserService userService;

	@Autowired
	private TokenService tokenService;

	@PostMapping()
	public String login(@RequestBody User login) {

		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(login.getUsername(),
				login.getPassword());

		Authentication auth = this.authenticationManager.authenticate(token);

		User usuario = (User) auth.getPrincipal();
		return tokenService.gerarToken(usuario);
	}

	@GetMapping
	public List<User> getAll() {
		return userService.findAll();
	}

	@PostMapping("/create")
	public User create(@RequestBody User login) {

		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(login.getUsername(),
				login.getPassword());

		login.setPassword(token.getCredentials().toString());
		userService.save(login);
		return login;
	}

}
