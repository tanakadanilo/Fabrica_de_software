package com.devnari.contrataai.services;

import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.devnari.contrataai.model.User;

@Service
public class TokenService {

	public String gerarToken(User user) {
		return JWT.create().withIssuer("Users").withSubject(user.getUsername()).withClaim("id", user.getId())
				.sign(Algorithm.HMAC256("123"));
	}
}
