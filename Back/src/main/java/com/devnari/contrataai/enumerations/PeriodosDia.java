package com.devnari.contrataai.enumerations;

import jakarta.persistence.Entity;
import lombok.Getter;

@Getter
@Entity
public enum PeriodosDia {

	MANHA(0), TARDE(1), NOITE(2);

	private int periodo;

	private PeriodosDia(int periodo) {
		this.periodo = periodo;
	}

}
