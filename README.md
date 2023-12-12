# Sistema de Chamados
<p align="center">
    <img src="https://github.com/GabrielLima5/imagens-projetos/blob/main/images/Sistema%20de%20Chamados.png">
</p>

Projeto responsivo de sistema de chamados, desenvolvido com React e Firebase durante o Curso de React do <a href="https://www.youtube.com/c/sujeitoprogramador">Sujeito Programador</a>. Este sistema oferece uma solução abrangente para gerenciar chamados, proporcionando uma experiência integrada e eficiente.

## Principais funcionalidades
* **Autenticação Segura:**
Para acessar o Sistema de Chamados, é necessário criar uma conta e autenticar-se. A autenticação adiciona uma camada adicional de segurança, garantindo que apenas usuários autorizados possam interagir com as funcionalidades do sistema.

* **Gerenciamento de Chamados:**
Dentro do sistema, os usuários têm a capacidade de visualizar chamados existentes, modificar seus status e criar novos chamados conforme necessário. A interface intuitiva torna o processo de gerenciamento de chamados eficiente e acessível.

* **Cadastro de Empresas:**
Uma funcionalidade única do Sistema de Chamados é a capacidade de cadastrar empresas previamente. Isso simplifica o processo de abertura de chamados, permitindo aos usuários associar rapidamente as solicitações às empresas relevantes.

## Habilidades Praticadas
Ao desenvolver este projeto, pude explorar e praticar diversas habilidades e conceitos fundamentais no desenvolvimento web com React e Firebase. Dentre eles, estão:

* **Renderização Dinâmica:**
A aplicação utiliza renderização dinâmica dos registros vindos do banco de dados (array de objetos) em forma de tabela, proporcionando uma visualização melhor dos dados.

* **Assincronismo com Async/Await:**
O Sistema de Chamados incorpora o uso de async/await para executar operações assíncronas com as funções do Firebase de forma eficiente.

* **Hooks useState() e useEffect():**
Os hooks useState e useEffect foram essenciais para a criação e consumo de variáveis de estado, bem como para o gerenciamento de efeitos colaterais dos componentes.

* **Navegação com React Router:**
Ao implementar o React Router na aplicação, pude dividir a aplicação em rotas e protegê-las com base na autenticação do usuário. Isso proporcionou uma navegação fluida e organizada pela aplicação, melhorando a experiência do usuário e tornando a interação mais intuitiva.

* **Context API:**
O uso da Context API foi fundamental para manter dados de autenticação do usuário globalmente acessíveis em toda a aplicação. Isso contribui para uma gestão das informações do usuário em diferentes componentes.

* **Integração com Firebase:**
O grande diferencial do Sistema de Chamados (algo que eu ainda não tinha aprendido plenamente antes) é a integração das diversas funções do Firebase, incluindo Firebase Auth, Firebase Database e Firebase Firestore. Essa integração possibilita a autenticação do usuário na plataforma, o armazenamento de dados relacionados aos chamados e a gestão de fotos de perfil dos usuários,