package com.devnari.contrataai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.devnari.contrataai.model.Contratante;
import com.devnari.contrataai.services.ContratanteService;

@SpringBootApplication
public class ContrataaiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ContrataaiApplication.class, args);
		Contratante c = new Contratante();
		new ContratanteService().adicionar(c);
	}

}
