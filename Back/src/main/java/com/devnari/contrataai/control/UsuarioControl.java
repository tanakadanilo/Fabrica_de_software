package com.devnari.contrataai.control;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devnari.contrataai.model.Usuario;
import com.devnari.contrataai.services.UserService;

@RestController
@RequestMapping("/login")
public class UsuarioControl {

	@Autowired
	private UserService userService;

	@GetMapping
	public List<Usuario> listAll() {
		return userService.findAll();
	}

	@PostMapping
	public Usuario create(@RequestBody Usuario usuario) {
		return userService.save(usuario);
	}

}
