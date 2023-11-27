package com.devnari.contrataai.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devnari.contrataai.model.PropostaContratacao;
import com.devnari.contrataai.persistencia.PropostaContratacaoDao;
import com.devnari.contrataai.util.StringUtil;

@Service
public class ContratarService {
	
	@Autowired 
	private PropostaContratacaoDao propostaContratacaoDao;
	
	static String contrato = "Entre:\n"
		    + "Contratante:[nomeContratante]\n"
		    + "Endereço:[enderecoContratante]\n"
		    + "Cidade/Estado:[cidade] - :[estado]\n"
		    + "\n"
		    + "E:\n"
		    + "Prestador de Serviços:[nomePrestador]\n"
		    + "Endereço:[enderecoPrestador]\n"
		    + "Cidade/Estado:[cidade] - :[estado]\n"
		    + "\n"
		    + "Data do Serviço:[dataServico]\n"
		    + "\n"
		    + "1. Descrição dos Serviços:\n"
		    + "O Contratante concorda em contratar o Prestador de Serviços para realizar o seguinte serviço:\n"
		    + ":[descricaoServico].\n"
		    + "\n"
		    + "2. Valor e Pagamento:\n"
		    + "O Contratante concorda em pagar ao Prestador de Serviços a quantia de "
		    + ":[valorContrato] pelos serviços prestados. O pagamento será efetuado da seguinte forma:\n"
		    + ":[descricaoPagamento].\n"
		    + "\n"
		    + "3. Prazo:\n"
		    + "O serviço será realizado no período compreendido entre "
		    + ":[dataServico] e "
		    + ":[dataServico]. O Prestador de Serviços fará todos os esforços razoáveis para cumprir esse prazo.\n"
		    + "\n"
		    + "4. Direitos de Propriedade:\n"
		    + "Qualquer produto resultante dos serviços, incluindo, mas não se limitando a, documentos, relatórios ou outros materiais, será de propriedade exclusiva do Contratante após o pagamento integral.\n"
		    + "\n"
		    + "5. Rescisão:\n"
		    + "Qualquer das partes pode rescindir este contrato mediante notificação por escrito à outra parte, com pelo menos "
		    + ":[prazoRecisao] de antecedência.\n"
		    + "\n"
		    + "6. Leis Aplicáveis:\n"
		    + "Este contrato será regido e interpretado de acordo com as leis do Estado de "
		    + ":[estado] e qualquer disputa decorrente deste contrato será resolvida no foro da cidade de "
		    + ":[cidade] - :[estado].\n"
		    + "\n"
		    + "Assinaturas:\n"
		    + "Este contrato entra em vigor na data da assinatura.\n"
		    + "Contratante:\n"
		    + "Nome: [nomeContratante]\n"
		    + "Prestador de Serviços:\n"
		    + "Nome: [nomePrestador]\n";

	@Autowired
	private EnviadorEmail enviadorEmail;

	public void enviarProposta(PropostaContratacao propostaContratacao) throws Exception {
		this.enviadorEmail.sendEmail(propostaContratacao.getPrestador().getContato().getEmail(),
				"Proposta de Contratacao", this.preencherDados(propostaContratacao));
		this.propostaContratacaoDao.save(propostaContratacao);
	}

	private String preencherDados(PropostaContratacao propostaContratacao) throws Exception {
		String contratoPreenchido = contrato;
		contratoPreenchido.replaceAll(":[nomeContratante]", propostaContratacao.getContratante().getNome())
				.replaceAll(":[enderecoContratante]", propostaContratacao.getContratante().getEndereco().toString())
				.replaceAll(":[cidade]",
						propostaContratacao.getContratante().getEndereco().getCidade())
				.replaceAll(":[cidade]",
						propostaContratacao.getContratante().getEndereco().getCidade())
				.replaceAll(":[nomePrestador]", propostaContratacao.getPrestador().getNome())
				.replaceAll(":[enderecoPrestador]", propostaContratacao.getPrestador().getEndereco().toString())
				.replaceAll(":[dataServico]", propostaContratacao.getDataContratacao().toString())
				.replaceAll(":[descricaoServico]", propostaContratacao.getServicoPrestado().getServico().getDescricao())
				.replaceAll(":[valorContrato]",
						StringUtil.formatarValorMonetario(propostaContratacao.getServicoPrestado().getValor().toString()))
				.replaceAll(":[estado]",
						propostaContratacao.getContratante().getEndereco().getUf().toString())
				
		;
		return contratoPreenchido;
	}
}
