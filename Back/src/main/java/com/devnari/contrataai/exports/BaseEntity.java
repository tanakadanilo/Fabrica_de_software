package com.devnari.contrataai.exports;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class BaseEntity {

	@Id
	protected int id;
	protected Date dataInclusao;
	protected Date dataUltimaAlteracao;
	protected boolean ativo;
}
