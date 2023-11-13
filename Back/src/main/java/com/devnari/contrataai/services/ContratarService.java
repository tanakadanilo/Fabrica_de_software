package com.devnari.contrataai.services;

import org.springframework.beans.factory.annotation.Autowired;

import com.devnari.contrataai.model.PropostaContratacao;

public class ContratarService {

	@Autowired
	private EnviadorEmail enviadorEmail;

	public void enviarProposta(PropostaContratacao propostaContratacao) {
		String contrato = "<br>	<p><strong>Entre:</strong></p>		<p><strong>Contratante:</strong> [Nome do Contratante]<br>	<strong>Endereço:</strong> [Endereço do Contratante]<br>	<strong>Cidade/Estado:</strong> [Cidade/Estado do Contratante]</p>	 	<p><strong>E:</strong></p>		<p><strong>Prestador de Serviços:</strong> [Nome do Prestador de Serviços]<br>	<strong>Endereço:</strong> [Endereço do Prestador de Serviços]<br>	<strong>Cidade/Estado:</strong> [Cidade/Estado do Prestador de Serviços]</p>	 	<p><strong>Data do Serviço:</strong> [Data do Serviço]</p>		<p><strong>1. Descrição dos Serviços:</strong><br>	O Contratante concorda em contratar o Prestador de Serviços para realizar o seguinte serviço:<br>	[Descreva o serviço de forma detalhada, incluindo qualquer especificação relevante, prazos e outros detalhes importantes].</p> 	<p><strong>2. Valor e Pagamento:</strong><br>	O Contratante concorda em pagar ao Prestador de Serviços a quantia de [Valor do Contrato] pelos serviços prestados. O pagamento será efetuado da seguinte forma:<br>	[Descreva as condições de pagamento, como depósito inicial, pagamentos parcelados, etc.].</p>		<p><strong>3. Prazo:</strong><br>	O serviço será realizado no período compreendido entre [Data de Início] e [Data de Término]. O Prestador de Serviços fará todos os esforços razoáveis para cumprir esse prazo.</p>		<p><strong>4. Direitos de Propriedade:</strong><br>	Qualquer produto resultante dos serviços, incluindo, mas não se limitando a, documentos, relatórios ou outros materiais, será de propriedade exclusiva do Contratante após o pagamento integral.</p>		<p><strong>5. Rescisão:</strong><br>	Qualquer das partes pode rescindir este contrato mediante notificação por escrito à outra parte, com pelo menos [número de dias] de antecedência.</p>	 	<p><strong>6. Leis Aplicáveis:</strong><br>	Este contrato será regido e interpretado de acordo com as leis do Estado de [Estado] e qualquer disputa decorrente deste contrato será resolvida no foro da cidade de [Cidade/Estado].</p>	<p><strong>Assinaturas:</strong><br>	Este contrato entra em vigor na data da assinatura.</p>	<p><strong>Contratante:</strong><br>	Nome: __________________________<br> 	<p><strong>Prestador de Serviços:</strong><br>Nome: __________________________<br><br>";
		this.enviadorEmail.sendEmail(propostaContratacao.getPrestador().getContato().getEmail(),
				"Proposta de Contratacao", contrato);
	}
}
