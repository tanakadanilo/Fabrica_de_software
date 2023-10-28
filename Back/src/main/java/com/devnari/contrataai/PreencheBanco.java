package com.devnari.contrataai;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devnari.contrataai.enumerations.DiasSemana;
import com.devnari.contrataai.enumerations.PeriodosDia;
import com.devnari.contrataai.enumerations.UF;
import com.devnari.contrataai.model.Contratante;
import com.devnari.contrataai.model.Prestador;
import com.devnari.contrataai.model.Servico;
import com.devnari.contrataai.model.ServicoPrestado;
import com.devnari.contrataai.model.Usuario;
import com.devnari.contrataai.model.auxiliares.Contato;
import com.devnari.contrataai.model.auxiliares.Disponibilidade;
import com.devnari.contrataai.model.auxiliares.Endereco;
import com.devnari.contrataai.model.auxiliares.Experiencia;
import com.devnari.contrataai.services.ContatoService;
import com.devnari.contrataai.services.ContratanteService;
import com.devnari.contrataai.services.DisponibilidadeService;
import com.devnari.contrataai.services.EnderecoService;
import com.devnari.contrataai.services.ExperienciaService;
import com.devnari.contrataai.services.PrestadorService;
import com.devnari.contrataai.services.ServicoPrestadoService;
import com.devnari.contrataai.services.ServicoService;

@RestController
@RequestMapping("/preencherbanco")
public class PreencheBanco {

	@Autowired
	EnderecoService enderecoService;

	@Autowired
	ExperienciaService experienciaService;

	@Autowired
	ContatoService contatoService;
	@Autowired
	DisponibilidadeService disponibilidadeService;

	@Autowired
	PrestadorService prestadorService;

	@Autowired
	ContratanteService contratanteService;

	@Autowired
	ServicoService servicoService;

	@Autowired
	ServicoPrestadoService servicoPrestadoService;

	@GetMapping
	public ResponseEntity<String> preencherBanco() {
		try {
			for (int i = 0; i < 10; i++) {
				Contato c = new Contato();
				c.setContato("Rua Juazeiros " + i);
				c.setEmail("teste" + i + "@email.com");
				c.setTelefone("" + i + i + i + i + i + i + i + i);
				c = contatoService.salvar(c);

				Endereco e = new Endereco();
				e.setBairro("Centro " + i);
				e.setCep("" + i + i + i + i);
				e.setCidade("Goiânia " + i);
				e.setComplemento("Do lado da rua " + Math.abs(i * 7 - 4 / 2 * 8));
				e.setLogradouro("Rua " + i);
				e.setNumero("" + i);
				e.setUf(UF.GO);
				e = enderecoService.salvar(e);

				Experiencia ex = new Experiencia();
				ex.setCertificado("" + ex.hashCode() + i);
				ex.setDescricaoAdcional("seguir a risca a normativa " + ex.getCertificado().hashCode());
				ex.setTempoExperiencia(new Date((int) Math.random()));
				ex = experienciaService.salvar(ex);

				Servico s = new Servico();
				s.setArea("Área descrita no item " + i);
				s.setDescricao("Descrição Detalhada" + i);
				s.setNome("Nome " + i);
				s = servicoService.salvar(s);

				Disponibilidade d = new Disponibilidade();
				switch (i % 7) {
				case 0 -> d.setDiaDaSemana(DiasSemana.DOMINGO);
				case 1 -> d.setDiaDaSemana(DiasSemana.SEGUNDA);
				case 2 -> d.setDiaDaSemana(DiasSemana.TERCA);
				case 3 -> d.setDiaDaSemana(DiasSemana.QUARTA);
				case 4 -> d.setDiaDaSemana(DiasSemana.QUINTA);
				case 5 -> d.setDiaDaSemana(DiasSemana.SEXTA);
				case 6 -> d.setDiaDaSemana(DiasSemana.SABADO);
				}
				switch (i % 3) {
				case 0 -> d.setHorario(PeriodosDia.MANHA);
				case 1 -> d.setHorario(PeriodosDia.TARDE);
				case 2 -> d.setHorario(PeriodosDia.NOITE);
				}
				d = disponibilidadeService.salvar(d);

				ServicoPrestado sp = new ServicoPrestado();
				sp.setExperiencia(ex);
				sp.setServico(s);
				sp = servicoPrestadoService.salvar(sp);

				Usuario usuario = new Usuario();
				usuario.setNome("nome" + i);
				usuario.setPassword("senha" + i);
				usuario.setUsername("username" + i);
				usuario.setPrestador(true);
				
				Prestador p = new Prestador();
				p.setUsuario(usuario);
				p.setContato(c);
				p.setCpf("" + p.hashCode());
				p.setDescricaoAdicional("Descrição " + i);
				List<Disponibilidade> disp = new ArrayList<>();
				disp.add(d);
				p.setDisponibilidades(new ArrayList<Disponibilidade>(disp));
				p.setEndereco(e);
				p.setFoto("" + p.hashCode() + ".jpg");
				p.setNome("José Henrique da Silva " + i);
				p.setPortfolio("www." + p.getNome().replace(" ", "") + ".com.br");
				p.setEspecializacao("Mestre em enrolação, certificado " + i + " Vezes!");
				p.getServicosPrestados().add(sp);
				p = prestadorService.salvar(p);

				Usuario usuario2 = new Usuario();
				usuario2.setNome("nome" + i);
				usuario2.setPassword("senha" + i);
				usuario2.setUsername("username" + i);
				usuario2.setPrestador(false);
				
				Contratante contratante = new Contratante();
				contratante.setContato(c);
				contratante.setCpf("" + contratante.hashCode());
				contratante.setNome("Pedro Paulo da Silva Saulo " + i);
				contratante.setEndereco(e);
				contratante.setFoto(contratante.hashCode() + ".jpg");
				contratante = contratanteService.salvar(contratante);

			}
			return ResponseEntity.ok("Banco Criado Com Sucesso!");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
}
