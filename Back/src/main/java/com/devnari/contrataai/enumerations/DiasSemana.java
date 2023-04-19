package com.devnari.contrataai.enumerations;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;

@Getter
@Entity
public enum DiasSemana {
	DOMINGO(1), SEGUNDA(2), TERCA(3), QUARTA(4), QUINTA(5), SEXTA(6), SABADO(7);

	@Id
	private int dia;

	private DiasSemana(int dia) {
		this.dia = dia;
	}

}
