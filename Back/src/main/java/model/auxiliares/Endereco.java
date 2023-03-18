package model.auxiliares;

import enumerations.UF;
import exports.BaseEntity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Endereco  extends BaseEntity{

	private String cep;
	private String logradouro;
	private String numero;
	private String cidade;
	private UF uf;
	private String bairro;
	private String complemento;
	
}
