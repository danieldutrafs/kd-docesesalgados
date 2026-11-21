/* ---------- CARDÁPIO (janela com imagem grande) ---------- */
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

/* ---------- ANIMAÇÃO AO ROLAR ---------- */
const alvos = document.querySelectorAll(
    '.area-mais-vendidos h2, .area-cardapio, .area-natal, .area-apresentacao, .area-depoimentos h2, .rodape'
);

alvos.forEach(el => el.classList.add('revelar'));

const observador = new IntersectionObserver((itens) => {
    itens.forEach(item => {
        if (item.isIntersecting) {
            item.target.classList.add('visivel');
            observador.unobserve(item.target);
        }
    });
}, { threshold: 0.15 });

alvos.forEach(el => observador.observe(el));

/* ---------- DICA DE DESLIZAR ---------- */
document.querySelectorAll('.area-cards, .cards-comentarios').forEach(carrossel => {
    const esconderDica = () => {
        carrossel.classList.add('ja-deslizou');
        carrossel.removeEventListener('scroll', esconderDica);
    };
    carrossel.addEventListener('scroll', esconderDica, { passive: true });
});

/* ---------- ARRASTAR COM O MOUSE (PC) ---------- */
document.querySelectorAll('.area-cards, .cards-comentarios').forEach(carrossel => {
    let apertado = false;
    let inicioX = 0;
    let inicioScroll = 0;

    carrossel.addEventListener('mousedown', e => {
        apertado = true;
        inicioX = e.pageX;
        inicioScroll = carrossel.scrollLeft;
        carrossel.classList.add('arrastando');
    });

    window.addEventListener('mouseup', () => {
        apertado = false;
        carrossel.classList.remove('arrastando');
    });

    carrossel.addEventListener('mousemove', e => {
        if (!apertado) return;
        e.preventDefault();
        carrossel.scrollLeft = inicioScroll - (e.pageX - inicioX);
    });
});