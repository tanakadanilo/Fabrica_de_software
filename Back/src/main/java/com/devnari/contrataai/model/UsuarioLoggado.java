package com.devnari.contrataai.model;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Collection;
import java.util.Date;
import java.util.LinkedList;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.auth0.jwt.JWT;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UsuarioLoggado implements UserDetails {

	private static final long serialVersionUID = 1L;

	private Pessoa pessoa;
	private Usuario usuario;

	private byte[] imagem = fileToBase64("a.jpg").getBytes();

	@Getter
	@Setter
	private String token;

	public static String fileToBase64(String filePath) {
		try {
			Path path = Paths.get(filePath);
			byte[] fileContent = Files.readAllBytes(path);
			byte[] base64Bytes = Base64.getEncoder().encode(fileContent);
			return new String(base64Bytes);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public UsuarioLoggado(Usuario usuario) {
		this.usuario = usuario;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return new LinkedList<>();
	}

	@Override
	public String getPassword() {
		return usuario.getPassword();
	}

	@Override
	public String getUsername() {
		return usuario.getUsername();
	}

	@Override
	public boolean isAccountNonExpired() {
		var ret = JWT.decode(token);

		Date dataExpiracao = ret.getExpiresAt();
		Date dataAgora = new Date();
		return dataAgora.before(dataExpiracao);
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;

	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;

	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
