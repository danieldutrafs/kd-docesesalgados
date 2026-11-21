const janela = document.getElementById('visualizador');
const imagem = janela.querySelector('img');

document.querySelectorAll('.item-cardapio').forEach(botao => {
    botao.addEventListener('click', () => {
        imagem.src = botao.dataset.img;
        janela.showModal();
    });
});

janela.querySelector('.fechar').addEventListener('click', () => janela.close());

// fecha ao tocar fora da imagem
janela.addEventListener('click', e => {
    if (e.target === janela) janela.close();
});

/* ---------- MENU HAMBÚRGUER ---------- */
const btnMenu = document.querySelector('.btn-menu');
const menu = document.getElementById('menu');
const fundoMenu = document.getElementById('fundo-menu');

function abrirMenu() {
    menu.classList.add('aberto');
    fundoMenu.classList.add('aberto');
    btnMenu.classList.add('ativo');
    btnMenu.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
}

function fecharMenu() {
    menu.classList.remove('aberto');
    fundoMenu.classList.remove('aberto');
    btnMenu.classList.remove('ativo');
    btnMenu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
}

btnMenu.addEventListener('click', () => {
    menu.classList.contains('aberto') ? fecharMenu() : abrirMenu();
});

// fecha ao tocar no fundo escuro, num link ou ao apertar Esc
fundoMenu.addEventListener('click', fecharMenu);
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', fecharMenu));
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') fecharMenu();
});