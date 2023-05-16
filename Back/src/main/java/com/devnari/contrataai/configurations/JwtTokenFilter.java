//package com.devnari.contrataai.configurations;
//
//import java.io.IOException;
//import java.util.ArrayList;
//import java.util.Date;
//
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//import com.auth0.jwt.JWT;
//import com.auth0.jwt.algorithms.Algorithm;
//import com.devnari.contrataai.model.Usuario;
//import com.fasterxml.jackson.databind.ObjectMapper;
//
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//
//public class JwtTokenFilter extends UsernamePasswordAuthenticationFilter {
//
//	private static final String SECRET = "root";
//	private AuthenticationManager authenticationManager;
//
//	public JwtTokenFilter(AuthenticationManager authenticationManager) {
//		this.authenticationManager = authenticationManager;
//
//		setFilterProcessesUrl("/api/services/controller/Usuario/login");
//	}
//
//	@Override
//	public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res)
//			throws AuthenticationException {
//		try {
//			Usuario creds = new ObjectMapper().readValue(req.getInputStream(), Usuario.class);
//
//			return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(creds.getUsername(),
//					creds.getPassword(), new ArrayList<>()));
//		} catch (IOException e) {
//			throw new RuntimeException(e);
//		}
//	}
//
//	@Override
//	protected void successfulAuthentication(HttpServletRequest req, HttpServletResponse res, FilterChain chain,
//			Authentication auth) throws IOException {
//		String token = JWT.create().withSubject(((Usuario) auth.getPrincipal()).getUsername())
//				.withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
//				.sign(Algorithm.HMAC512(SECRET.getBytes()));
//
//		String body = ((Usuario) auth.getPrincipal()).getUsername() + " " + token;
//
//		res.getWriter().write(body);
//		res.getWriter().flush();
//	}
//}