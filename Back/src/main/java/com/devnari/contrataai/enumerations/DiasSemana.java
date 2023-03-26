package com.devnari.contrataai.enumerations;

import jakarta.persistence.Entity;
import lombok.Getter;

@Getter
@Entity
public enum DiasSemana {
	DOMINGO(1), SEGUNDA(2), TERCA(3), QUARTA(4), QUINTA(5), SEXTA(6), SABADO(7);

	private int dia;

	private DiasSemana(int dia) {
		this.dia = dia;
	}

}
