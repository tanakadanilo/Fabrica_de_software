package model;

import java.util.List;

import exports.BaseEntity;
import lombok.Getter;
import lombok.Setter;
import model.auxiliares.Contato;
import model.auxiliares.Endereco;

@Getter
@Setter
public class Contratante extends BaseEntity {

	private String nome;
	private String email;
	private List<Contato> contato;
	private String CPF;
	private Endereco endereco;

	// * opcional
	private String foto;
}
