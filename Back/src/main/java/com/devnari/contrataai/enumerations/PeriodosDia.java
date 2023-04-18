package com.devnari.contrataai.enumerations;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;

@Getter
@Entity
public enum PeriodosDia {

	MANHA(0), TARDE(1), NOITE(2);

	@Id
	private int periodo;

	private PeriodosDia(int periodo) {
		this.periodo = periodo;
	}

}
