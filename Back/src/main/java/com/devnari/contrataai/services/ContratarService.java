package com.devnari.contrataai.services;

import java.text.SimpleDateFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devnari.contrataai.model.PropostaContratacao;
import com.devnari.contrataai.persistencia.PropostaContratacaoDao;
import com.devnari.contrataai.util.StringUtil;

@Service
public class ContratarService {

	@Autowired
	private PropostaContratacaoDao propostaContratacaoDao;

	static String contrato = "Termos de serviço\n\n\n\n"
			+ "Entre:\n" + "Contratante:nomeContratante\n" + "Endereço:enderecoContratante\n"
			+ "Cidade/Estado:cidade - :estado\n" + "\n" + "E:\n" + "Prestador de Serviços:nomePrestador\n"
			+ "Endereço:enderecoPrestador\n" + "Cidade/Estado:cidade - :estado\n" + "\n"
			+ "Data do Serviço:dataServico\n" + "\n" + "1. Descrição dos Serviços:\n"
			+ "O Contratante concorda em contratar o Prestador de Serviços para realizar o seguinte serviço:\n"
			+ ":descricaoServico.\n" + "\n" + "2. Valor e Pagamento:\n"
			+ "O Contratante concorda em pagar ao Prestador de Serviços a quantia de "
			+ ":valorContrato pelos serviços prestados. O pagamento será efetuado ao final do serviço, a forma de pagamento deverá ser acordada entre as partes.\n"
			+ "3. Prazo:\n" + "O serviço será realizado no período compreendido entre " + ":dataServico e "
			+ ":dataServico. Cabendo ao prestador realizar todos os esforços razoáveis para cumprir esse prazo.\n"
			+ "\n" + "5. Rescisão:\n"
			+ "Qualquer das partes pode rescindir este contrato mediante notificação por escrito à outra parte, com pelo menos "
			+ ":prazoRecisao de antecedência.\n" + "\n" + "6. Leis Aplicáveis:\n"
			+ "Este contrato será regido e interpretado de acordo com o código de defesa do consumidor.\n\n\n";

	@Autowired
	private EnviadorEmail enviadorEmail;

	public void enviarProposta(PropostaContratacao propostaContratacao) throws Exception {
		this.enviadorEmail.sendEmail(propostaContratacao.getPrestador().getContato().getEmail(),
				"Proposta de Contratacao", this.preencherDados(propostaContratacao));
		this.enviadorEmail.sendEmail(propostaContratacao.getContratante().getContato().getEmail(),
				"Proposta de Contratacao", this.preencherDados(propostaContratacao));
		this.propostaContratacaoDao.save(propostaContratacao);
	}

	private String preencherDados(PropostaContratacao propostaContratacao) throws Exception {
		String contratoPreenchido = contrato;
		contratoPreenchido = contratoPreenchido
				.replaceAll(":nomeContratante", " " + propostaContratacao.getContratante().getNome())
				.replaceAll(":enderecoContratante", " " + propostaContratacao.getContratante().getEndereco().toString())
				.replaceAll(":cidade", " " + propostaContratacao.getContratante().getEndereco().getCidade())
				.replaceAll(":cidade", " " + propostaContratacao.getContratante().getEndereco().getCidade())
				.replaceAll(":nomePrestador", " " + propostaContratacao.getPrestador().getNome())
				.replaceAll(":prazoRecisao", " 3 dias antes da data de início do serviço")
				.replaceAll(":enderecoPrestador", " " + propostaContratacao.getPrestador().getEndereco().toString())
				.replaceAll(":dataServico",
						" " + new SimpleDateFormat("dd/MM/yyyy HH:mm:ss")
								.format(propostaContratacao.getDataContratacao()))
				.replaceAll(":descricaoServico",
						" " + propostaContratacao.getServicoPrestado().getServico().getDescricao())
				.replaceAll(":valorContrato",
						" " + "BRL "
								+ StringUtil.formatarComDuasCasasDecimais(
										propostaContratacao.getServicoPrestado().getValor().toString()))
				.replaceAll(":estado", " " + propostaContratacao.getContratante().getEndereco().getUf().toString())

		;
		return contratoPreenchido;
	}
}
