# Marketplace de Serviços

### 1 - Visão Geral do Software
O software é um marketplace de serviços que conecta prestadores de serviços a consumidores. Seu objetivo é fornecer uma plataforma onde os usuários possam se cadastrar, exibindo serviços e preços para os prestadores e permitindo a contratação de serviços pelos consumidores. O sistema também oferece recursos de busca, filtragem, avaliação e geração simplificada de contratos. Com uma interface intuitiva e responsiva, o software visa facilitar o encontro de pessoas que precisam de serviços e prestadores de serviços, criando uma experiência confiável e conveniente para ambas as partes.

#### 1.1 - Objetivo do Software
O objetivo do software é criar um marketplace de serviços, fornecendo uma plataforma onde os usuários possam se cadastrar como prestadores de serviços ou consumidores desses serviços. O software visa conectar pessoas que precisam de serviços a prestadores de serviços, oferecendo uma vitrine online para os prestadores exibirem seus serviços e preços.

#### 1.2 - Escopo do Projeto e Requisitos de Software
O escopo do projeto inclui o desenvolvimento de um site para o marketplace de serviços. Os requisitos de software envolvem os seguintes aspectos:

- Cadastro de usuários como prestadores de serviços ou consumidores de serviços.
- Exibição dos serviços e preços oferecidos pelos prestadores de serviços.
- Funcionalidades para buscar, filtrar e comparar serviços.
- Sistema de contratos simplificados para registrar os serviços contratados.
- Recursos de avaliação e feedback dos usuários sobre os serviços prestados.
- Recursos de segurança e privacidade para proteger as informações dos usuários.

Entre outros requisitos funcionais e não funcionais.

#### 1.3 - Modelo de Domínio

Nosso diagrama de domínio é uma representação visual das principais entidades e relacionamentos em nosso sistema de marketplace de serviços. Ele captura a essência do fluxo de dados e interações dentro do nosso ecossistema, permitindo uma compreensão clara da estrutura do software.

De maneira geral, os usuários são classificados como "Contratante" e "Prestador", entre eles há um vínculo que é o serviço contratado.

![Diagrama](https://github.com/tanakadanilo/Fabrica_de_software/assets/100390360/2ff14687-fb16-487b-941d-750b2d8f910e)
Esse diagrama é suscetível a mudanças conforme formos amadurecendo nossas ideias.

Esperamos que esse breve resumo do nosso diagrama de domínio ajude a transmitir a essência do nosso sistema e inspire confiança em nossa capacidade de fornecer uma plataforma sólida e funcional.

### 2 - Arquitetura do Software
O software segue uma arquitetura cliente-servidor, onde o frontend é implementado usando o framework Angular e a biblioteca Nebular para construir a interface de usuário. O frontend consome APIs RESTful fornecidas pelo backend.

No lado do backend, o software é desenvolvido em Java utilizando o framework Spring Boot, que facilita o desenvolvimento de aplicativos web. O banco de dados PostgreSQL é utilizado para armazenar os dados relacionais do sistema.

#### 2.1 - Tecnologias da Implementação
As principais tecnologias utilizadas na implementação do software são:

Frontend:


- Angular: Um framework JavaScript para construção de interfaces de usuário ricas e interativas.
- Nebular: Uma biblioteca de componentes UI para Angular, que fornece recursos prontos para uso.
- HTML, CSS e JavaScript: Tecnologias fundamentais para a construção da interface de usuário.

Backend:

- Java: Linguagem de programação utilizada para o desenvolvimento do backend.
- Spring Boot: Um framework Java que simplifica o desenvolvimento de aplicativos web.
- PostgreSQL: Um sistema de gerenciamento de banco de dados relacional utilizado para armazenar os dados do sistema.

Essas tecnologias foram escolhidas para garantir um desenvolvimento eficiente e robusto do software, permitindo a criação de uma interface de usuário moderna e interativa, juntamente com uma lógica de negócio segura e um banco de dados confiável.


### Referências

1. Angular. Disponível em: https://angular.io/. Acesso em: 20 abril 2023.
2. Spring Boot. Disponível em: https://spring.io/projects/spring-boot. Acesso em: 20 abril 2023.
3. PostgreSQL. Disponível em: https://www.postgresql.org/. Acesso em: 01 maio 2023.
4. TypeScript. Disponível em: https://www.typescriptlang.org/. Acesso em: 23 abril 2023.
5. Java. Disponível em: https://www.java.com/. Acesso em: 08 abril 2023.

### Contatos

#### João Pedro Teles Lustosa
- E-mail: jteles050@gmail.com
