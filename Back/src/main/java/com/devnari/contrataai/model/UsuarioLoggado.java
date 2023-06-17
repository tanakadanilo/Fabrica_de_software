package com.devnari.contrataai.model;

import java.util.Collection;
import java.util.Date;
import java.util.LinkedList;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.auth0.jwt.JWT;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
public class UsuarioLoggado implements UserDetails {

	private static final long serialVersionUID = 1L;

	private Usuario usuario;

	@Getter
	@Setter
	private String token;

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
