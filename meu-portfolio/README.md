# Portfólio Web de Fernando Sortes Fernandes

Atividade final do 4º bimestre: **Portfólio Web Dinâmico** (Canes Solution).

## 1. Descrição do projeto

Portfólio pessoal de um estudante de Ensino Médio Técnico em Tecnologia da Informação (Senac Nações Unidas) que pretende cursar Engenharia de Software. O site apresenta o perfil do aluno, o que as disciplinas do Ensino Médio ensinaram sobre lógica de programação, quatro tendências tecnológicas, uma galeria com os trabalhos do curso e um formulário de contato.

As mensagens do formulário são guardadas no **LocalStorage** do navegador (em JSON), podem ser gerenciadas por um **painel administrativo oculto** (CRUD completo) e também geram uma **notificação por e-mail** usando o **EmailJS**.

O projeto foi feito do zero, sem construtores de site.

## 2. Tecnologias utilizadas

| Tecnologia | Para que foi usada |
|---|---|
| HTML5 | Estrutura da página |
| CSS3 (Flexbox e Grid) | Visual personalizado (`css/style.css`) |
| JavaScript puro | Interface, validação, LocalStorage, painel e envio |
| Bootstrap 5.3 (via CDN) | Menu, grade responsiva, cartões, formulários e botões |
| EmailJS (via CDN) | Envio da notificação por e-mail, sem precisar de servidor |

Não foram usados frameworks (React, Angular, Vue), TypeScript, PHP, banco SQL nem construtores de site.

> **Atenção:** o Bootstrap e o EmailJS são carregados pela internet (CDN). Para ver o site completo é preciso estar conectado.

## 3. Estrutura de pastas

```
meu-portfolio/
│
├── index.html            Estrutura principal (site + painel administrativo oculto)
│
├── css/
│   └── style.css         Toda a estilização personalizada
│
├── js/
│   ├── script.js         Funcionalidades gerais (menu, botão de topo, ano do rodapé)
│   ├── contato.js        Formulário, validação, LocalStorage, 20 mensagens e EmailJS
│   └── admin.js          Painel administrativo e CRUD
│
├── assets/
│   ├── imagens/          Foto de perfil
│   ├── certificados/     PDFs dos cursos concluídos
│   └── projetos/         Capturas de tela dos projetos da galeria
│
└── README.md             Esta documentação
```

Ordem dos scripts no `index.html` (importante): `script.js` → `contato.js` → `admin.js`. O `admin.js` usa funções que estão no `contato.js`.

## 4. Funcionalidades

- Menu fixo com navegação suave entre as seções e menus suspensos para as áreas do conhecimento e as tendências.
- Apresentação pessoal: nome, foto, perfil, formação atual e futura, hard skills (com o nível real), soft skills, cursos concluídos (com certificado em PDF), objetivo e contatos.
- 4 seções de Áreas do Conhecimento (Humanas, Natureza, Matemática e Linguagens).
- 4 seções de Tendências Tecnológicas (Cibersegurança, Blockchain, Automação e Robótica, Edge Computing), cada uma com: o que é, como funciona, onde é utilizada e importância.
- Galeria com 11 projetos (1 em destaque, 3 exercícios de CSS em destaque e 7 demais exercícios).
- Formulário de contato com validação e mensagens claras para o visitante.
- Armazenamento das mensagens no LocalStorage em JSON e CRUD completo no painel.
- Layout responsivo (Mobile First) com Bootstrap, Flexbox e Grid.

## 5. Como abrir no VS Code

1. Instale o [VS Code](https://code.visualstudio.com/).
2. Descompacte o arquivo `.zip` do projeto.
3. No VS Code, clique em **Arquivo → Abrir Pasta** e escolha a pasta `meu-portfolio`.
4. Abra o arquivo `index.html`.

## 6. Como executar no navegador

**Opção A (mais simples):** dê dois cliques no arquivo `index.html`. Ele abre no navegador.

**Opção B (recomendada para testar o e-mail):** use a extensão **Live Server** do VS Code.
1. Na aba de extensões do VS Code, procure por **Live Server** (Ritwick Dey) e instale.
2. Clique com o botão direito em `index.html` e escolha **Open with Live Server**.
3. O site abre em um endereço parecido com `http://127.0.0.1:5500/index.html`.

## 7. Como acessar o painel administrativo (área oculta)

O painel **não aparece em nenhum menu**. Para abrir, digite `#admin` no final do endereço do site:

- Abrindo o arquivo direto: `index.html#admin` (acrescente `#admin` no final do endereço na barra do navegador).
- Com o Live Server: `http://127.0.0.1:5500/index.html#admin`

**Senha de demonstração:** `admin123`

> **Aviso importante:** essa senha está escrita no arquivo `js/admin.js`. Qualquer pessoa que abrir o código consegue ver. Ou seja, a autenticação feita somente no Front-end é **demonstrativa** e **não oferece segurança real**. Ela existe apenas para simular uma área restrita. Segurança de verdade exige um servidor (Back-end).

Para sair do painel, use **Voltar ao site** ou **Sair do painel**.

## 8. Como testar o CRUD

Abra o painel (item 7) e faça o roteiro abaixo.

| Operação | Como testar | O que deve acontecer |
|---|---|---|
| **Criar** | Volte ao site, preencha o formulário em **Contato** e envie. Abra o painel. | A mensagem nova aparece no topo da lista com a origem **Formulário**. |
| **Ler (lista)** | Abra o painel. | Tabela com todas as mensagens e o contador de total, demonstração e recebidas pelo formulário. |
| **Ler (detalhes)** | Clique em **Detalhes** em qualquer linha. | Aparecem todos os dados, inclusive a mensagem completa. |
| **Atualizar** | Clique em **Editar**, mude o nome ou o assunto e clique em **Salvar alterações**. | A tabela mostra o novo valor e o LocalStorage é atualizado. |
| **Excluir** | Clique em **Excluir** e confirme. | A mensagem some e o contador diminui. |

Para conferir o LocalStorage: no navegador, aperte **F12 → aba Application (Aplicativo) → Local Storage →** endereço do site. A chave se chama `mensagensPortfolio` e o valor é a lista em JSON.

## 9. Como funcionam as 20 mensagens iniciais

Quando o site é aberto, o `contato.js` verifica se a chave `mensagensPortfolio` existe no LocalStorage:

- **Não existe (primeiro acesso):** o código cadastra automaticamente **20 mensagens fictícias** para teste.
- **Já existe:** nada é inserido de novo. Isso vale mesmo que você exclua mensagens, inclusive todas.

Essas mensagens são identificadas como **dados de demonstração** (campo `demonstracao: true`, selo **Demonstração** no painel, e e-mails com o domínio `exemplo.com`).

**Para ver a injeção de novo:** aperte **F12 → Application → Local Storage**, apague a chave `mensagensPortfolio` e recarregue a página.

## 10. Como configurar o EmailJS (envio real de e-mail)

> **Situação atual:** o site já está pronto para o EmailJS, mas **o envio de e-mail só funciona depois que você colocar seus próprios códigos**. Enquanto isso não for feito, o formulário salva a mensagem no LocalStorage e avisa ao visitante que o e-mail não foi enviado.

Nenhum código foi inventado: no arquivo `js/contato.js` existem apenas textos de exemplo (`COLE_SUA_PUBLIC_KEY_AQUI`, etc.) para você trocar.

### Passo 1: criar a conta
1. Acesse [emailjs.com](https://www.emailjs.com/) e clique em **Sign Up Free**.
2. Crie a conta e confirme o e-mail.

### Passo 2: conectar o serviço de e-mail
1. No painel do EmailJS, abra **Email Services** e clique em **Add New Service**.
2. Escolha o provedor da conta que vai **enviar** o aviso (por exemplo, Outlook ou Gmail) e faça o login autorizando a conexão. Assim você não coloca senha em nenhum arquivo.
3. Salve. Copie o **Service ID** (parecido com `service_xxxxxxx`).

### Passo 3: criar o modelo (template) da mensagem
1. Abra **Email Templates** e clique em **Create New Template**.
2. Em **To Email**, coloque o e-mail que vai receber o aviso: `fernando.sortes@outlook.com`.
3. Em **Reply To**, coloque `{{email}}` (assim, ao responder, você responde para o visitante).
4. Em **Subject**, escreva: `Portfólio: {{assunto}}`
5. No conteúdo, use exatamente estas variáveis (os nomes precisam ser iguais aos do código):

```
Nova mensagem pelo portfólio.

Nome: {{nome}}
E-mail: {{email}}
Assunto: {{assunto}}
Data: {{data}}

Mensagem:
{{mensagem}}
```

6. Salve e copie o **Template ID** (parecido com `template_xxxxxxx`).

### Passo 4: pegar a Public Key
1. Clique no seu nome (canto superior direito) → **Account** → aba **General**.
2. Copie a **Public Key**.

### Passo 5: colocar os códigos no projeto
Abra `js/contato.js`. No início do arquivo estão estas três linhas. Troque o texto entre aspas pelos seus códigos:

```javascript
var EMAILJS_PUBLIC_KEY  = "COLE_SUA_PUBLIC_KEY_AQUI";   // Passo 4
var EMAILJS_SERVICE_ID  = "COLE_SEU_SERVICE_ID_AQUI";   // Passo 2
var EMAILJS_TEMPLATE_ID = "COLE_SEU_TEMPLATE_ID_AQUI";  // Passo 3
```

A **Public Key** foi feita para ficar no navegador, não é uma senha. **Nunca** coloque senha de e-mail nem a *Private Key* nos arquivos do projeto.

### Passo 6: testar
1. Abra o site com o **Live Server** (item 6, opção B).
2. Envie uma mensagem pelo formulário.
3. Confira a caixa de entrada e a pasta de **spam**.
4. No painel administrativo, a coluna **E-mail enviado?** deve mostrar **Sim** para essa mensagem. Se mostrar **Falhou**, abra o F12 → aba **Console** para ver o erro e confira os três códigos.

Como o site sempre salva a mensagem antes de tentar enviar o e-mail, nenhuma mensagem se perde se o envio falhar. O visitante vê um aviso diferente para cada situação (enviado, não configurado ou falhou).

O plano gratuito do EmailJS tem limite mensal de envios. Se o limite acabar, o envio falha, mas a mensagem continua salva no LocalStorage.

### Justificativa da ferramenta de automação (EmailJS)
- O projeto só pode usar HTML, CSS, JavaScript e Bootstrap (sem PHP nem outro Back-end). O EmailJS envia e-mails **direto do JavaScript**, sem servidor próprio.
- Tem plano gratuito e configuração simples, adequada para um estudante.
- Conecta-se à conta de e-mail por autorização (login), sem guardar senha no código.
- Permite montar o texto do e-mail em um modelo (template) com variáveis.
- Atende ao requisito de **notificação real** para o e-mail do aluno.

## 11. Galeria de projetos e links dos repositórios

Os projetos foram identificados a partir dos arquivos enviados. Cada cartão mostra apenas as tecnologias confirmadas nos arquivos.

- Os **exercícios 01 a 10** são exercícios de aula (HTML e CSS) e são apresentados como tal.
- O **VerdeVivo (11)** é um projeto independente (PHP, MySQL/MariaDB com PDO, Bootstrap e JavaScript). O código dele **não** está dentro deste portfólio.
- As **capturas de tela** dos exercícios (`assets/projetos/*.png`) são reais, mas foram feitas sem as imagens externas das páginas. A imagem do VerdeVivo (`11-verdevivo-ecommerce.jpg`) é uma captura real da página inicial do projeto.

### Links atuais
Hoje todos os links "Ver repositório" apontam para o repositório que existe no seu GitHub: `https://github.com/FernandoSortes/tudo` (cada um para a pasta do projeto). Nenhum endereço novo foi inventado.

### Como atualizar depois de reorganizar o GitHub
1. No VS Code, aperte **Ctrl + Shift + H** (buscar e substituir em todos os arquivos).
2. **Primeiro o VerdeVivo** (para ele não ser afetado pelo passo seguinte):
   - Buscar: `https://github.com/FernandoSortes/tudo/tree/main/11-verdevivo-ecommerce`
   - Substituir por: o endereço do seu repositório `verdevivo` (copie da barra do navegador).
3. **Depois os exercícios 01 a 10** (se as pastas mantiverem os mesmos nomes no novo repositório):
   - Buscar: `https://github.com/FernandoSortes/tudo/tree/main/`
   - Substituir por: `ENDEREÇO-DO-REPOSITÓRIO-meus-exercicios-html-css/tree/main/`
4. No `index.html`, cada link tem um comentário `LINK DO REPOSITÓRIO` logo acima, para facilitar a localização.
5. Clique em cada link do site para confirmar que abre a página certa. Se as pastas ficarem com nomes diferentes no novo repositório, ajuste o final de cada link à mão.

## 12. Como trocar a foto

A foto atual é `assets/imagens/foto-fernando.jpg` (quadrada, 600x600). Para trocar, substitua esse arquivo por outro com o mesmo nome (de preferência quadrado) ou mude o `src` e o `alt` da imagem no `index.html`.

## 12.1 Cursos e certificados

Os três cursos ficam na seção **Sobre mim** (bloco "Cursos concluídos"), com data, ID do certificado (quando o PDF informa) e link para o PDF em `assets/certificados/`. Para adicionar outro curso, copie um item `<li class="certificado">` no `index.html` e coloque o PDF nessa pasta.

## 13. Lista de verificação dos requisitos do professor

**Etapa 00: Restrições**
- [x] Código feito do zero, sem construtor de sites.

**Etapa 01: Interface**
- [x] HTML5, CSS3, JavaScript e Bootstrap.
- [x] Apresentação pessoal: nome, foto, perfil, hard skills e soft skills (mais os cursos concluídos).
- [x] Áreas do Conhecimento: 4 seções (Humanas, Natureza, Matemática, Linguagens).
- [x] Tendências Tecnológicas: 4 seções (Cibersegurança, Blockchain, Automação/Robótica, Edge Computing).
- [x] Galeria de Projetos: descrição, imagem e link para o repositório (links atuais; atualizar após reorganizar o GitHub).
- [x] Contato: formulário com armazenamento local e automação de envio.
- [x] Responsividade Mobile First com classes do Bootstrap, Flexbox e Grid.

**Etapa 02: Armazenamento**
- [x] Painel administrativo oculto (`index.html#admin`).
- [x] CRUD das mensagens com a API LocalStorage.
- [x] Dados armazenados em JSON.
- [x] Verificação do LocalStorage no primeiro acesso e injeção automática de 20 registros de teste.
- [ ] **Notificação real por e-mail (EmailJS): o código está pronto, mas depende de você configurar suas credenciais (item 10) e testar.**

**Etapa 03: Entrega**
- [x] README.md explicando a escolha da ferramenta de automação (item 10) e como acessar a área administrativa oculta (item 7).
- [ ] Enviar no Microsoft Teams o arquivo `.zip` do projeto (feito por você).
- [ ] Publicar o projeto no repositório `portfolio` do GitHub (feito por você).

## 14. O que ainda precisa ser preenchido ou conferido por você

- Credenciais do EmailJS (item 10).
- Links dos repositórios, depois de reorganizar o GitHub (item 11).
- Leia os textos das Áreas do Conhecimento e ajuste para o seu relato pessoal (o professor pede um **relato** de como as disciplinas ajudaram você).
