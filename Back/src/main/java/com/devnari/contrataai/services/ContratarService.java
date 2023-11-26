package com.devnari.contrataai.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devnari.contrataai.model.PropostaContratacao;
import com.devnari.contrataai.util.StringUtil;

@Service
public class ContratarService {
	static String contrato = "<br><p><strong>Entre:</strong></p><p><strong>Contratante:</strong>"
			+ ":[nomeContratante]<br><strong>Endereço:</strong>"
			+ ":[enderecoContratante]<br><strong>Cidade/Estado:</strong>"
			+ ":[cidade] - :[estado]</p><p><strong>E:</strong></p><p><strong>Prestador de Serviços:</strong>"
			+ ":[nomePrestador]<br><strong>Endereço:</strong>"
			+ ":[enderecoPrestador]<br><strong>Cidade/Estado:</strong>"
			+ ":[cidade] - :[estado]</p><p><strong>Data do Serviço:</strong>"
			+ ":[dataServico]</p><p><strong>1. Descrição dos Serviços:</strong><br>	O Contratante concorda em contratar o Prestador de Serviços para realizar o seguinte serviço:<br>"
			+ ":[descricaoServico].</p><p><strong>2. Valor e Pagamento:</strong><br>	O Contratante concorda em pagar ao Prestador de Serviços a quantia de "
			+ ":[valorContrato] pelos serviços prestados. O pagamento será efetuado da seguinte forma:<br>	"
			/* o q colocar? */
			+ ":[descricaoPagamento].</p><p><strong>3. Prazo:</strong><br>	O serviço será realizado no período compreendido entre "
			+ ":[dataServico] e "
			+ ":[dataServico]. O Prestador de Serviços fará todos os esforços razoáveis para cumprir esse prazo.</p><p><strong>4. Direitos de Propriedade:</strong><br>	Qualquer produto resultante dos serviços, incluindo, mas não se limitando a, documentos, relatórios ou outros materiais, será de propriedade exclusiva do Contratante após o pagamento integral.</p><p><strong>5. Rescisão:</strong><br>	Qualquer das partes pode rescindir este contrato mediante notificação por escrito à outra parte, com pelo menos "
			+ ":[prazoRecisao] de antecedência.</p><p><strong>6. Leis Aplicáveis:</strong><br>	Este contrato será regido e interpretado de acordo com as leis do Estado de "
			+ ":[estado] e qualquer disputa decorrente deste contrato será resolvida no foro da cidade de "
			+ ":[cidade] - :[estado].</p><p><strong>Assinaturas:</strong><br>	Este contrato entra em vigor na data da assinatura.</p><p><strong>Contratante:</strong><br>	Nome: "
			+ ":[nomeContratante]<br> 	<p><strong>Prestador de Serviços:</strong><br>Nome: "
			+ ":[nomePrestador]<br><br>";

	@Autowired
	private EnviadorEmail enviadorEmail;

	public void enviarProposta(PropostaContratacao propostaContratacao) throws Exception {
		this.enviadorEmail.sendEmail(propostaContratacao.getPrestador().getContato().getEmail(),
				"Proposta de Contratacao", this.preencherDados(propostaContratacao));
	}

	private String preencherDados(PropostaContratacao propostaContratacao) throws Exception {
		String contratoPreenchido = contrato;
		contratoPreenchido.replace(":[nomeContratante]", propostaContratacao.getContratante().getNome())
				.replace(":[enderecoContratante]", propostaContratacao.getContratante().getEndereco().toString())
				.replace(":[cidade]",
						propostaContratacao.getContratante().getEndereco().getCidade())
				.replace(":[cidade]",
						propostaContratacao.getContratante().getEndereco().getCidade())
				.replace(":[nomePrestador]", propostaContratacao.getPrestador().getNome())
				.replace(":[enderecoPrestador]", propostaContratacao.getPrestador().getEndereco().toString())
				.replace(":[dataServico]", propostaContratacao.getDataContratacao().toString())
				.replace(":[descricaoServico]", propostaContratacao.getServico().getDescricao())
				.replace(":[valorContrato]",
						StringUtil.formatarValorMonetario(propostaContratacao.getServico().getValor().toString()))
				.replace(":[estado]",
						propostaContratacao.getContratante().getEndereco().getUf().toString())
				
		;
		return contratoPreenchido;
	}
}
