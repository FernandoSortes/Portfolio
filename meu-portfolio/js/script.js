// =====================================================
// script.js - funcionalidades gerais da interface
// (menu, botão de voltar ao topo e ano do rodapé)
// =====================================================

// ---------- 1) Ano atual no rodapé ----------
var elementoAno = document.getElementById("ano");
if (elementoAno) {
    elementoAno.textContent = new Date().getFullYear();
}

// ---------- 2) Fechar o menu do celular depois de clicar em um link ----------
var menu = document.getElementById("menu");
var linksDoMenu = document.querySelectorAll("#menu .nav-link:not(.dropdown-toggle), #menu .dropdown-item");

for (var i = 0; i < linksDoMenu.length; i++) {
    linksDoMenu[i].addEventListener("click", function () {
        // só fecha se o menu estiver aberto e se o Bootstrap carregou
        if (menu.classList.contains("show") && typeof bootstrap !== "undefined") {
            bootstrap.Collapse.getOrCreateInstance(menu).hide();
        }
    });
}

// ---------- 3) Botão "voltar ao topo" ----------
var botaoTopo = document.getElementById("botao-topo");

// Mostra o botão quando a página já rolou mais de 400px
window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
        botaoTopo.classList.add("visivel");
    } else {
        botaoTopo.classList.remove("visivel");
    }
});

botaoTopo.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
