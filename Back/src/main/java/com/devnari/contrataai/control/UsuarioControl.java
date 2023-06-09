package com.devnari.contrataai.control;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devnari.contrataai.base.Response;
import com.devnari.contrataai.model.Usuario;
import com.devnari.contrataai.model.UsuarioLoggado;
import com.devnari.contrataai.services.UsuarioLoggadoService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/login")
public class UsuarioControl {

	@Autowired
	private UsuarioLoggadoService userService;

	@GetMapping
	public ResponseEntity<Response<List<Usuario>>> listAll(HttpServletRequest request) {
		Response<List<Usuario>> response = new Response<>();
		try {
			List<Usuario> usuarios = userService.findAll();
			response.setData(usuarios);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@PostMapping
	public ResponseEntity<Response<Usuario>> create(@RequestBody Usuario usuario) {
		Response<Usuario> response = new Response<>();
		try {
			usuario = userService.save(usuario);
			response.setData(usuario);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@GetMapping("/login")
	public ResponseEntity<Response<String>> login(@RequestParam("username") String username,
			@RequestParam("password") String password) {
		Response<String> response = new Response<>();
		try {
			String token = userService.login(username, password);
			response.setData(token);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

	@GetMapping("/findbytoken")
	public ResponseEntity<Response<UsuarioLoggado>> findByToken(@RequestParam("token") String token) {
		Response<UsuarioLoggado> response = new Response<>();
		try {
			UsuarioLoggado usuarioLoggado = userService.findByToken(token);
			response.setData(usuarioLoggado);
		} catch (Exception e) {
			e.printStackTrace();
			response.getErros().add(e.getMessage());
		}
		return ResponseEntity.ok(response);
	}

}
