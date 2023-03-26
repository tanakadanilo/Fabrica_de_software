package com.devnari.contrataai.model.auxiliares;

import com.devnari.contrataai.exports.BaseEntity;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Contato  extends BaseEntity{
	private String contato;
}
