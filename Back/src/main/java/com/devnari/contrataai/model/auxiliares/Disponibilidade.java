package com.devnari.contrataai.model.auxiliares;

import com.devnari.contrataai.enumerations.DiasSemana;
import com.devnari.contrataai.enumerations.PeriodosDia;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Disponibilidade {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private DiasSemana diaDaSemana;
	private PeriodosDia horário;
}
