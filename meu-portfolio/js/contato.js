// =====================================================
// contato.js
// - formulário de contato e validação
// - armazenamento das mensagens no LocalStorage (em JSON)
// - 20 mensagens de demonstração no primeiro acesso
// - envio de e-mail pelo EmailJS
//
// IMPORTANTE: o admin.js usa várias funções deste arquivo
// (lerMensagens, salvarMensagens, validarCampos...), por isso
// o contato.js precisa ser carregado ANTES do admin.js no HTML.
// =====================================================


// =====================================================
// 1) CONFIGURAÇÃO DO EMAILJS  <-- PREENCHA AQUI (veja o README.md)
//    Troque os textos entre aspas pelos seus dados do painel do EmailJS.
//    A Public Key do EmailJS foi feita para ficar no navegador,
//    mas NUNCA coloque senhas de e-mail neste arquivo.
// =====================================================
var EMAILJS_PUBLIC_KEY  = "COLE_SUA_PUBLIC_KEY_AQUI";
var EMAILJS_SERVICE_ID  = "COLE_SEU_SERVICE_ID_AQUI";
var EMAILJS_TEMPLATE_ID = "COLE_SEU_TEMPLATE_ID_AQUI";

// Nome (chave) com que as mensagens ficam guardadas no LocalStorage
var CHAVE_MENSAGENS = "mensagensPortfolio";


// =====================================================
// 2) FUNÇÕES DO LOCALSTORAGE (CRUD)
//    Criar  -> acontece no formulário (mais abaixo) usando salvarMensagens
//    Ler    -> lerMensagens
//    Atualizar e Excluir -> feitos no admin.js, também com lerMensagens + salvarMensagens
// =====================================================

// Lê a lista de mensagens do LocalStorage e transforma de JSON para array
function lerMensagens() {
    try {
        var texto = localStorage.getItem(CHAVE_MENSAGENS);
        if (texto === null) {
            return [];
        }
        return JSON.parse(texto);
    } catch (erro) {
        console.log("Não foi possível ler o LocalStorage:", erro);
        return [];
    }
}

// Transforma o array em JSON e guarda no LocalStorage.
// Devolve true se deu certo e false se deu erro.
function salvarMensagens(lista) {
    try {
        localStorage.setItem(CHAVE_MENSAGENS, JSON.stringify(lista));
        return true;
    } catch (erro) {
        console.log("Não foi possível salvar no LocalStorage:", erro);
        return false;
    }
}

// Cria um número de identificação novo (o maior que existe + 1)
function gerarNovoId(lista) {
    var maior = 0;
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].id > maior) {
            maior = lista[i].id;
        }
    }
    return maior + 1;
}

// Troca caracteres especiais por texto seguro antes de colocar na tela.
// Isso evita que alguém escreva código HTML/JavaScript dentro de uma mensagem.
function escaparHtml(texto) {
    return String(texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

// Transforma a data guardada (texto ISO) em data legível: 25/11/2026 14:30
function formatarData(dataIso) {
    var data = new Date(dataIso);
    if (isNaN(data.getTime())) {
        return "Data inválida";
    }
    return data.toLocaleDateString("pt-BR") + " " +
           data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}


// =====================================================
// 3) 20 MENSAGENS DE DEMONSTRAÇÃO (dados fictícios)
// =====================================================

function criarMensagensDemonstracao() {
    // Cada linha: [nome, e-mail, assunto, mensagem]. Todos os dados são inventados.
    var modelos = [
        ["Ana Souza",        "ana.souza@exemplo.com",       "Oportunidade de estágio",     "Olá! Vimos seu portfólio e gostaríamos de conversar sobre uma vaga de estágio em desenvolvimento."],
        ["Bruno Lima",       "bruno.lima@exemplo.com",      "Parabéns pelo site",           "Gostei muito do layout e da organização das seções. Parabéns pelo trabalho!"],
        ["Carla Mendes",     "carla.mendes@exemplo.com",    "Dúvida sobre o VerdeVivo",     "Como funciona a área administrativa do projeto VerdeVivo? Tem alguma demonstração?"],
        ["Diego Alves",      "diego.alves@exemplo.com",     "Projeto em equipe",            "Estamos montando um grupo para um projeto de site. Você teria interesse em participar?"],
        ["Eduarda Rocha",    "eduarda.rocha@exemplo.com",   "Convite para evento",          "Teremos um evento de tecnologia para estudantes em São Paulo. Gostaria de convidar você."],
        ["Felipe Castro",    "felipe.castro@exemplo.com",   "Feedback sobre o portfólio",   "A seção de tendências tecnológicas está bem explicada. Sugiro adicionar mais exemplos de uso."],
        ["Gabriela Nunes",   "gabriela.nunes@exemplo.com",  "Mentoria",                     "Sou desenvolvedora e posso ajudar com dicas de carreira para quem está começando. Vamos conversar?"],
        ["Henrique Dias",    "henrique.dias@exemplo.com",   "Vaga de jovem aprendiz",       "Estamos com vagas abertas para jovem aprendiz na área de tecnologia. Posso enviar os detalhes?"],
        ["Isabela Martins",  "isabela.martins@exemplo.com", "Dúvida sobre o curso",         "Estou pensando em fazer o Ensino Médio Técnico em TI. Como tem sido sua experiência?"],
        ["João Pereira",     "joao.pereira@exemplo.com",    "Troca de conhecimento",        "Também estou aprendendo HTML e CSS. Podemos trocar dicas e revisar os códigos um do outro?"],
        ["Karina Ribeiro",   "karina.ribeiro@exemplo.com",  "Sugestão de estudo",           "Recomendo estudar Git e GitHub com calma, pois ajudam muito na organização dos projetos."],
        ["Lucas Teixeira",   "lucas.teixeira@exemplo.com",  "Pedido de orçamento",          "Preciso de uma página simples para minha loja. Você faz esse tipo de trabalho?"],
        ["Marina Barros",    "marina.barros@exemplo.com",   "Parceria em projeto escolar",  "Podemos fazer um trabalho em dupla sobre cibersegurança? Vi que você gosta do tema."],
        ["Nicolas Araújo",   "nicolas.araujo@exemplo.com",  "Dúvida técnica",               "Como você fez o formulário de contato com validação? Estou com dificuldade no meu."],
        ["Olívia Fernandes", "olivia.fernandes@exemplo.com","Convite para palestra",        "Vamos receber profissionais de software em uma palestra. Seria legal contar com sua presença."],
        ["Paulo Gomes",      "paulo.gomes@exemplo.com",     "Elogio ao design",             "O visual do portfólio está limpo e fácil de navegar, inclusive no celular."],
        ["Renata Cardoso",   "renata.cardoso@exemplo.com",  "Processo seletivo",            "Abrimos um processo seletivo para estágio em desenvolvimento. Podemos marcar uma conversa?"],
        ["Sérgio Moreira",   "sergio.moreira@exemplo.com",  "Dúvida sobre Java",            "Você pode indicar algum material para quem está começando em Java?"],
        ["Tatiane Freitas",  "tatiane.freitas@exemplo.com", "Contato profissional",         "Gostaria de adicionar você à minha rede de contatos profissionais. Podemos nos conectar?"],
        ["Vinícius Correia", "vinicius.correia@exemplo.com","Teste do formulário",          "Mensagem enviada apenas para testar o funcionamento do formulário de contato."]
    ];

    var lista = [];
    for (var i = 0; i < modelos.length; i++) {
        // cada mensagem recebe uma data diferente (uma por dia, para trás)
        var data = new Date(Date.now() - (i + 1) * 24 * 60 * 60 * 1000 - i * 60 * 60 * 1000);

        lista.push({
            id: i + 1,
            nome: modelos[i][0],
            email: modelos[i][1],
            assunto: modelos[i][2],
            mensagem: modelos[i][3],
            data: data.toISOString(),
            demonstracao: true,              // marca que é um dado de teste
            statusEmail: "demonstracao"      // não foi enviado e-mail para estes registros
        });
    }
    return lista;
}

// Primeiro acesso: se o LocalStorage ainda NÃO tem a chave das mensagens,
// guarda as 20 mensagens de demonstração. Se a chave já existe (mesmo que a
// lista esteja vazia por causa de exclusões), não insere nada de novo.
function iniciarArmazenamento() {
    try {
        if (localStorage.getItem(CHAVE_MENSAGENS) === null) {
            salvarMensagens(criarMensagensDemonstracao());
            console.log("Primeiro acesso: 20 mensagens de demonstração foram cadastradas.");
        }
    } catch (erro) {
        console.log("LocalStorage indisponível neste navegador:", erro);
    }
}

iniciarArmazenamento();


// =====================================================
// 4) VALIDAÇÃO DOS CAMPOS
//    Devolve um objeto com as mensagens de erro. Se estiver vazio, está tudo certo.
//    Exemplo: { nome: "Digite seu nome.", email: "E-mail inválido." }
// =====================================================

function validarCampos(nome, email, assunto, mensagem) {
    var erros = {};

    if (nome.length < 3) {
        erros.nome = "Digite seu nome (mínimo de 3 letras).";
    }

    // Verificação simples: texto + @ + texto + ponto + texto
    var modeloEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
        erros.email = "Digite seu e-mail.";
    } else if (!modeloEmail.test(email)) {
        erros.email = "Digite um e-mail válido, por exemplo: nome@email.com.";
    }

    if (assunto.length < 3) {
        erros.assunto = "Digite o assunto (mínimo de 3 letras).";
    }

    if (mensagem.length < 10) {
        erros.mensagem = "A mensagem precisa ter pelo menos 10 caracteres.";
    } else if (mensagem.length > 1000) {
        erros.mensagem = "A mensagem pode ter no máximo 1000 caracteres.";
    }

    return erros;
}


// =====================================================
// 5) ENVIO DE E-MAIL (EmailJS)
//    Devolve (por uma Promise) um destes textos:
//    "enviado"          -> o EmailJS aceitou o envio
//    "nao-configurado"  -> os códigos acima ainda não foram preenchidos
//    "falhou"           -> deu erro (sem internet, código errado, limite...)
// =====================================================

function emailConfigurado() {
    return EMAILJS_PUBLIC_KEY.indexOf("COLE_") !== 0 &&
           EMAILJS_SERVICE_ID.indexOf("COLE_") !== 0 &&
           EMAILJS_TEMPLATE_ID.indexOf("COLE_") !== 0;
}

function enviarEmail(mensagem) {
    if (!emailConfigurado()) {
        return Promise.resolve("nao-configurado");
    }

    // Se o script do EmailJS não carregou (ex.: sem internet)
    if (typeof emailjs === "undefined") {
        return Promise.resolve("falhou");
    }

    // Estes nomes precisam ser iguais às variáveis do template no EmailJS: {{nome}}, {{email}}...
    var parametros = {
        nome: mensagem.nome,
        email: mensagem.email,
        assunto: mensagem.assunto,
        mensagem: mensagem.mensagem,
        data: formatarData(mensagem.data)
    };

    return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, parametros, { publicKey: EMAILJS_PUBLIC_KEY })
        .then(function () {
            return "enviado";
        })
        .catch(function (erro) {
            console.log("Erro no EmailJS:", erro);
            return "falhou";
        });
}


// =====================================================
// 6) FORMULÁRIO DE CONTATO
// =====================================================

var formContato = document.getElementById("form-contato");
var areaResultado = document.getElementById("resultado-contato");
var botaoEnviar = document.getElementById("botao-enviar");
var camposDoFormulario = ["nome", "email", "assunto", "mensagem"];

// Mostra uma mensagem para o visitante. tipo: "success", "warning" ou "danger"
function mostrarResultado(tipo, texto) {
    areaResultado.className = "mt-3 alert alert-" + tipo;
    areaResultado.textContent = texto;
}

// Marca em vermelho os campos com erro e escreve a mensagem embaixo de cada um
function mostrarErrosFormulario(erros) {
    for (var i = 0; i < camposDoFormulario.length; i++) {
        var campo = camposDoFormulario[i];
        var input = document.getElementById(campo);
        var caixaErro = document.getElementById("erro-" + campo);

        if (erros[campo]) {
            input.classList.add("is-invalid");
            caixaErro.textContent = erros[campo];
        } else {
            input.classList.remove("is-invalid");
            caixaErro.textContent = "";
        }
    }
}

// Quando o visitante volta a digitar em um campo, tira o vermelho dele
for (var c = 0; c < camposDoFormulario.length; c++) {
    document.getElementById(camposDoFormulario[c]).addEventListener("input", function () {
        this.classList.remove("is-invalid");
    });
}

formContato.addEventListener("submit", function (evento) {
    // Impede a página de recarregar
    evento.preventDefault();

    // Pega o que foi digitado (trim tira espaços do começo e do fim)
    var nome = document.getElementById("nome").value.trim();
    var email = document.getElementById("email").value.trim();
    var assunto = document.getElementById("assunto").value.trim();
    var texto = document.getElementById("mensagem").value.trim();

    // 1) Validar
    var erros = validarCampos(nome, email, assunto, texto);
    mostrarErrosFormulario(erros);

    if (Object.keys(erros).length > 0) {
        mostrarResultado("danger", "Não foi possível enviar. Corrija os campos destacados e tente de novo.");
        return;
    }

    // 2) CRIAR a mensagem e salvar no LocalStorage (acontece mesmo que o e-mail falhe)
    var lista = lerMensagens();
    var novaMensagem = {
        id: gerarNovoId(lista),
        nome: nome,
        email: email,
        assunto: assunto,
        mensagem: texto,
        data: new Date().toISOString(),
        demonstracao: false,
        statusEmail: "enviando"
    };
    lista.push(novaMensagem);
    var salvouLocal = salvarMensagens(lista);

    // 3) Tentar enviar o e-mail
    botaoEnviar.disabled = true;
    botaoEnviar.textContent = "Enviando...";
    areaResultado.className = "mt-3";
    areaResultado.textContent = "";

    enviarEmail(novaMensagem).then(function (status) {

        // Guarda no LocalStorage o resultado do envio do e-mail
        if (salvouLocal) {
            var listaAtual = lerMensagens();
            for (var i = 0; i < listaAtual.length; i++) {
                if (listaAtual[i].id === novaMensagem.id) {
                    listaAtual[i].statusEmail = status;
                }
            }
            salvarMensagens(listaAtual);
        }

        // Conta ao visitante exatamente o que aconteceu
        if (status === "enviado" && salvouLocal) {
            mostrarResultado("success", "Mensagem enviada com sucesso! Obrigado pelo contato. Uma cópia também foi salva neste navegador.");
        } else if (status === "enviado") {
            mostrarResultado("warning", "Mensagem enviada por e-mail, mas não foi possível salvar uma cópia neste navegador.");
        } else if (status === "nao-configurado" && salvouLocal) {
            mostrarResultado("warning", "Sua mensagem foi salva neste navegador, mas o envio por e-mail ainda não está configurado neste site. Se preferir, escreva para fernando.sortes@outlook.com.");
        } else if (salvouLocal) {
            mostrarResultado("warning", "Sua mensagem foi salva neste navegador, mas não foi possível enviá-la por e-mail agora. Tente novamente mais tarde ou escreva para fernando.sortes@outlook.com.");
        } else {
            mostrarResultado("danger", "Não foi possível enviar nem salvar a mensagem. Escreva para fernando.sortes@outlook.com.");
        }

        // Limpa o formulário só se a mensagem foi guardada em algum lugar
        if (salvouLocal || status === "enviado") {
            formContato.reset();
        }

        botaoEnviar.disabled = false;
        botaoEnviar.textContent = "Enviar mensagem";
    });
});
