package com.devnari.contrataai.services;

import org.springframework.beans.factory.annotation.Autowired;

import com.devnari.contrataai.dao.ContratanteDao;
import com.devnari.contrataai.model.Contratante;

public class ContratanteService {

	@Autowired
	private ContratanteDao contratanteDao;

	public void adicionar(Contratante c) {
		contratanteDao.save(c);
	}
}
