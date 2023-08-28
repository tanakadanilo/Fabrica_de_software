package com.devnari.contrataai.control;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devnari.contrataai.base.Response;
import com.devnari.contrataai.services.EnviadorEmail;

@RestController
@RequestMapping("/email")
public class EmailControl {

	private final EnviadorEmail emailService;

	public EmailControl(EnviadorEmail emailService) {
		this.emailService = emailService;
	}

	@PostMapping("/enviar")
	public Response<String> sendEmail(@RequestParam String to, @RequestParam String subject,
			@RequestParam String body) {
		Response<String> response = new Response<>();
		try {
			emailService.sendEmail(to, subject, body);
			response.setData("E-mail enviado com sucesso!");
		} catch (Exception e) {
			response.getErros().add(e.getMessage());
		}
		return response;
	}
}
