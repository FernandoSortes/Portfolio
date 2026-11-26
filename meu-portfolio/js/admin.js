// =====================================================
// admin.js - painel administrativo oculto + CRUD das mensagens
//
// Este arquivo usa funções que estão no contato.js:
// lerMensagens, salvarMensagens, validarCampos, escaparHtml e formatarData.
//
// COMO ABRIR O PAINEL: acesse  index.html#admin
// SENHA: veja o README.md.
// AVISO: uma senha escrita no JavaScript é só DEMONSTRATIVA. Qualquer pessoa
// consegue ler este arquivo, então isso NÃO oferece segurança de verdade.
// =====================================================

var SENHA_ADMIN = "admin123";

// ---------- Elementos da página ----------
var siteNormal = document.getElementById("site");
var secaoAdmin = document.getElementById("admin");
var telaLogin = document.getElementById("admin-login");
var painelAdmin = document.getElementById("admin-painel");
var formLogin = document.getElementById("form-admin-login");
var erroLogin = document.getElementById("admin-erro-login");
var contadorAdmin = document.getElementById("admin-contador");
var avisoAdmin = document.getElementById("admin-aviso");
var listaAdmin = document.getElementById("admin-lista");
var caixaDetalhes = document.getElementById("admin-detalhes");
var conteudoDetalhes = document.getElementById("admin-detalhes-conteudo");
var caixaEdicao = document.getElementById("admin-edicao");
var formEdicao = document.getElementById("form-admin-edicao");
var errosEdicao = document.getElementById("admin-erros-edicao");


// =====================================================
// 1) MOSTRAR OU ESCONDER O PAINEL (pelo endereço #admin)
// =====================================================

function painelEstaLogado() {
    try {
        return sessionStorage.getItem("adminLogado") === "sim";
    } catch (erro) {
        return false;
    }
}

function verificarEndereco() {
    if (location.hash === "#admin") {
        // Mostra o painel e esconde o site
        siteNormal.classList.add("d-none");
        secaoAdmin.classList.remove("d-none");
        window.scrollTo(0, 0);

        if (painelEstaLogado()) {
            mostrarPainel();
        } else {
            telaLogin.classList.remove("d-none");
            painelAdmin.classList.add("d-none");
        }
    } else {
        // Mostra o site e esconde o painel
        var estavaNoAdmin = !secaoAdmin.classList.contains("d-none");
        secaoAdmin.classList.add("d-none");
        siteNormal.classList.remove("d-none");

        // Se voltou do painel, rola até a parte do site que o endereço indica
        if (estavaNoAdmin && location.hash.length > 1) {
            var destino = document.querySelector(location.hash);
            if (destino) {
                destino.scrollIntoView();
            }
        }
    }
}

window.addEventListener("hashchange", verificarEndereco);
verificarEndereco();


// =====================================================
// 2) LOGIN DE DEMONSTRAÇÃO
// =====================================================

formLogin.addEventListener("submit", function (evento) {
    evento.preventDefault();
    var senhaDigitada = document.getElementById("admin-senha").value;

    if (senhaDigitada === SENHA_ADMIN) {
        try {
            sessionStorage.setItem("adminLogado", "sim");
        } catch (erro) {
            console.log("sessionStorage indisponível:", erro);
        }
        erroLogin.textContent = "";
        document.getElementById("admin-senha").value = "";
        mostrarPainel();
    } else {
        erroLogin.textContent = "Senha incorreta. Tente novamente.";
    }
});

document.getElementById("botao-sair-admin").addEventListener("click", function () {
    try {
        sessionStorage.removeItem("adminLogado");
    } catch (erro) {
        console.log("sessionStorage indisponível:", erro);
    }
    fecharDetalhes();
    fecharEdicao();
    telaLogin.classList.remove("d-none");
    painelAdmin.classList.add("d-none");
});

function mostrarPainel() {
    telaLogin.classList.add("d-none");
    painelAdmin.classList.remove("d-none");
    desenharLista();
}


// =====================================================
// 3) LER: desenhar a lista de mensagens e o contador
// =====================================================

function mostrarAviso(tipo, texto) {
    avisoAdmin.className = "alert alert-" + tipo;
    avisoAdmin.textContent = texto;
}

function textoDoStatusEmail(status) {
    if (status === "enviado") { return "Sim"; }
    if (status === "falhou") { return "Falhou"; }
    if (status === "nao-configurado") { return "Não configurado"; }
    if (status === "demonstracao") { return "Não se aplica"; }
    return "Sem confirmação";
}

function desenharLista() {
    var mensagens = lerMensagens();

    // Contador: total, demonstração e recebidas pelo formulário
    var quantidadeDemo = 0;
    for (var i = 0; i < mensagens.length; i++) {
        if (mensagens[i].demonstracao) {
            quantidadeDemo++;
        }
    }
    var quantidadeReais = mensagens.length - quantidadeDemo;
    contadorAdmin.textContent = "Total: " + mensagens.length + " mensagem(ns) — " +
        quantidadeDemo + " de demonstração e " + quantidadeReais + " recebida(s) pelo formulário.";

    // Lista vazia
    if (mensagens.length === 0) {
        listaAdmin.innerHTML = '<tr><td colspan="7" class="text-center text-secondary py-4">Nenhuma mensagem armazenada.</td></tr>';
        return;
    }

    // Monta uma linha da tabela para cada mensagem (as mais novas primeiro)
    var linhas = "";
    for (var j = mensagens.length - 1; j >= 0; j--) {
        var m = mensagens[j];
        var origem = m.demonstracao
            ? '<span class="badge text-bg-secondary">Demonstração</span>'
            : '<span class="badge text-bg-success">Formulário</span>';

        linhas += "<tr>" +
            "<td>" + m.id + "</td>" +
            "<td>" + escaparHtml(m.nome) + "</td>" +
            "<td>" + escaparHtml(m.assunto) + "</td>" +
            "<td>" + formatarData(m.data) + "</td>" +
            "<td>" + origem + "</td>" +
            "<td>" + textoDoStatusEmail(m.statusEmail) + "</td>" +
            '<td class="text-nowrap">' +
                '<button type="button" class="btn btn-outline-secondary btn-sm me-1" data-acao="detalhes" data-id="' + m.id + '">Detalhes</button>' +
                '<button type="button" class="btn btn-outline-primary btn-sm me-1" data-acao="editar" data-id="' + m.id + '">Editar</button>' +
                '<button type="button" class="btn btn-outline-danger btn-sm" data-acao="excluir" data-id="' + m.id + '">Excluir</button>' +
            "</td>" +
            "</tr>";
    }
    listaAdmin.innerHTML = linhas;
}

// Um único "ouvinte" na tabela descobre qual botão foi clicado
listaAdmin.addEventListener("click", function (evento) {
    var botao = evento.target.closest("button");
    if (!botao) {
        return;
    }

    var acao = botao.getAttribute("data-acao");
    var id = Number(botao.getAttribute("data-id"));

    if (acao === "detalhes") {
        mostrarDetalhes(id);
    } else if (acao === "editar") {
        abrirEdicao(id);
    } else if (acao === "excluir") {
        excluirMensagem(id);
    }
});

// Procura uma mensagem pelo id (devolve null se não achar)
function buscarMensagem(id) {
    var mensagens = lerMensagens();
    for (var i = 0; i < mensagens.length; i++) {
        if (mensagens[i].id === id) {
            return mensagens[i];
        }
    }
    return null;
}


// =====================================================
// 4) LER (um item): detalhes da mensagem
// =====================================================

function mostrarDetalhes(id) {
    var m = buscarMensagem(id);
    if (m === null) {
        mostrarAviso("danger", "Mensagem não encontrada.");
        return;
    }

    fecharEdicao();

    var html =
        '<p class="detalhe-linha"><strong>Nº:</strong> ' + m.id + "</p>" +
        '<p class="detalhe-linha"><strong>Nome:</strong> ' + escaparHtml(m.nome) + "</p>" +
        '<p class="detalhe-linha"><strong>E-mail:</strong> ' + escaparHtml(m.email) + "</p>" +
        '<p class="detalhe-linha"><strong>Assunto:</strong> ' + escaparHtml(m.assunto) + "</p>" +
        '<p class="detalhe-linha"><strong>Data:</strong> ' + formatarData(m.data) + "</p>" +
        '<p class="detalhe-linha"><strong>Origem:</strong> ' + (m.demonstracao ? "Dado de demonstração (fictício)" : "Recebida pelo formulário") + "</p>" +
        '<p class="detalhe-linha"><strong>E-mail enviado?</strong> ' + textoDoStatusEmail(m.statusEmail) + "</p>";

    if (m.editadaEm) {
        html += '<p class="detalhe-linha"><strong>Última edição:</strong> ' + formatarData(m.editadaEm) + "</p>";
    }

    html += '<p class="detalhe-linha mb-1"><strong>Mensagem:</strong></p>' +
            '<div class="texto-mensagem">' + escaparHtml(m.mensagem) + "</div>";

    conteudoDetalhes.innerHTML = html;
    caixaDetalhes.classList.remove("d-none");
    caixaDetalhes.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function fecharDetalhes() {
    caixaDetalhes.classList.add("d-none");
    conteudoDetalhes.innerHTML = "";
}

document.getElementById("botao-fechar-detalhes").addEventListener("click", fecharDetalhes);


// =====================================================
// 5) ATUALIZAR: editar uma mensagem
// =====================================================

function abrirEdicao(id) {
    var m = buscarMensagem(id);
    if (m === null) {
        mostrarAviso("danger", "Mensagem não encontrada.");
        return;
    }

    fecharDetalhes();

    // Coloca os dados atuais dentro do formulário de edição
    document.getElementById("edit-id").value = m.id;
    document.getElementById("edit-nome").value = m.nome;
    document.getElementById("edit-email").value = m.email;
    document.getElementById("edit-assunto").value = m.assunto;
    document.getElementById("edit-mensagem").value = m.mensagem;
    errosEdicao.textContent = "";

    caixaEdicao.classList.remove("d-none");
    caixaEdicao.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function fecharEdicao() {
    caixaEdicao.classList.add("d-none");
    errosEdicao.textContent = "";
}

document.getElementById("botao-cancelar-edicao").addEventListener("click", fecharEdicao);

formEdicao.addEventListener("submit", function (evento) {
    evento.preventDefault();

    var id = Number(document.getElementById("edit-id").value);
    var nome = document.getElementById("edit-nome").value.trim();
    var email = document.getElementById("edit-email").value.trim();
    var assunto = document.getElementById("edit-assunto").value.trim();
    var texto = document.getElementById("edit-mensagem").value.trim();

    // Usa a mesma validação do formulário de contato
    var erros = validarCampos(nome, email, assunto, texto);
    var listaDeErros = Object.values(erros);
    if (listaDeErros.length > 0) {
        errosEdicao.textContent = listaDeErros.join(" ");
        return;
    }

    // Procura a mensagem na lista, troca os dados e salva de novo no LocalStorage
    var mensagens = lerMensagens();
    var encontrou = false;
    for (var i = 0; i < mensagens.length; i++) {
        if (mensagens[i].id === id) {
            mensagens[i].nome = nome;
            mensagens[i].email = email;
            mensagens[i].assunto = assunto;
            mensagens[i].mensagem = texto;
            mensagens[i].editadaEm = new Date().toISOString();
            encontrou = true;
        }
    }

    if (!encontrou) {
        mostrarAviso("danger", "Mensagem não encontrada. Ela pode ter sido excluída.");
        fecharEdicao();
        desenharLista();
        return;
    }

    if (salvarMensagens(mensagens)) {
        mostrarAviso("success", "Mensagem nº " + id + " atualizada com sucesso.");
    } else {
        mostrarAviso("danger", "Não foi possível salvar a alteração no LocalStorage.");
    }
    fecharEdicao();
    desenharLista();
});


// =====================================================
// 6) EXCLUIR uma mensagem
// =====================================================

function excluirMensagem(id) {
    var confirmou = window.confirm("Tem certeza que deseja excluir a mensagem nº " + id + "?");
    if (!confirmou) {
        return;
    }

    var mensagens = lerMensagens();
    var novaLista = [];

    // Copia para a nova lista todas as mensagens, menos a que será excluída
    for (var i = 0; i < mensagens.length; i++) {
        if (mensagens[i].id !== id) {
            novaLista.push(mensagens[i]);
        }
    }

    if (salvarMensagens(novaLista)) {
        mostrarAviso("success", "Mensagem nº " + id + " excluída.");
    } else {
        mostrarAviso("danger", "Não foi possível salvar a exclusão no LocalStorage.");
    }

    // Se a mensagem excluída estava aberta em detalhes ou edição, fecha
    fecharDetalhes();
    fecharEdicao();
    desenharLista();
}
