package com.devnari.contrataai.control;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devnari.contrataai.model.Usuario;
import com.devnari.contrataai.model.UsuarioLoggado;
import com.devnari.contrataai.services.UsuarioLoggadoService;

@RestController
@RequestMapping("/login")
public class UsuarioControl {

	@Autowired
	private UsuarioLoggadoService userService;

	@GetMapping
	public List<Usuario> listAll() {
		return userService.findAll();
	}

	@PostMapping
	public Usuario create(@RequestBody Usuario usuario) {
		return userService.save(usuario);
	}

	@GetMapping("/login")
	public String login(@RequestParam("username") String username, @RequestParam("password") String password) {
		try {
			return userService.login(username, password);
		} catch (Exception e) {
			e.printStackTrace();
			return e.getMessage();
		}
	}

	@GetMapping("/findbytoken")
	public UsuarioLoggado findByToken(@RequestParam("token") String token) {
		try {
			return userService.findByToken(token);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
