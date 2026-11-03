function mostrarNavMobile() {
    const mobileMenu = document.getElementById('mobile_menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
}


const navLinks = document.querySelectorAll('#nav_list .nav-item a, #mobile_nav_list .nav-item a');

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        this.parentElement.classList.add('active');

        const mobileMenu = document.getElementById('mobile_menu');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
        }
    });
});

const secoes = document.querySelectorAll('main section');

const opçõesObserver = {
    root: null,
    rootMargin: '-40% 0px -40% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const links = document.querySelectorAll(`a[href="#${entry.target.id}"]`);
    if (!links.length) return; 
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    links.forEach(l => l.parentElement.classList.add('active'));
    });
}, opçõesObserver);

secoes.forEach(secao => observer.observe(secao));

const duracaoAnimacao = window.innerWidth < 768 ? 500 : 2000;

ScrollReveal().reveal('#home_info', {
    origin: 'left',
    duration: 2000,
    distance: '2%'
})

ScrollReveal().reveal('#sobre_info', {
    origin: 'right',
    duration: 2000,
    distance: '20%'
})

const telaGrande = window.innerWidth > 1050;

ScrollReveal().reveal('.l', {
    origin: 'right',
    duration: duracaoAnimacao,
    distance: '10%',
    viewFactor: telaGrande ? 0.3 : 0,  
    viewOffset: { top: 0, bottom: telaGrande ? 20 : 0 }
})

ScrollReveal().reveal('.r', {
    origin: 'left',
    duration: duracaoAnimacao,
    distance: '10%',
    viewFactor: telaGrande ? 0.3 : 0,
    viewOffset: { top: 0, bottom: telaGrande ? 20 : 0 }
})

ScrollReveal().reveal('#portfolio', {
    origin: 'left',
    duration: 2000,
    distance: '2%'
})

const carrossel = document.querySelector('.carrossel');

if (carrossel) {
    const trilho = carrossel.querySelector('.carrossel-trilho');
    const slides = carrossel.querySelectorAll('.carrossel-slide');
    const btnAnterior = carrossel.querySelector('.carrossel-anterior');
    const btnProximo = carrossel.querySelector('.carrossel-proximo');
    const areaBolinhas = carrossel.querySelector('.carrossel-bolinhas');

    let atual = 0;
    let timer = null;
    const intervalo = 5000;
    const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    slides.forEach((_, i) => {
        const b = document.createElement('button');
        b.setAttribute('aria-label', `Ir para a foto ${i + 1}`);
        b.addEventListener('click', () => { irPara(i); reiniciar(); });
        areaBolinhas.appendChild(b);
    });
    const bolinhas = areaBolinhas.querySelectorAll('button');

    function irPara(indice) {
        atual = (indice + slides.length) % slides.length;
        trilho.style.transform = `translateX(-${atual * 100}%)`;
        bolinhas.forEach((b, i) => b.classList.toggle('ativa', i === atual));
    }

    function iniciar() {
        if (reduzirMovimento) return;
        clearInterval(timer);
        timer = setInterval(() => irPara(atual + 1), intervalo);
    }

    function parar() { clearInterval(timer); }
    function reiniciar() {
        parar();
        if (!focoDentro) iniciar();
    }

    btnAnterior.addEventListener('click', () => { irPara(atual - 1); reiniciar(); });
    btnProximo.addEventListener('click', () => { irPara(atual + 1); reiniciar(); });

    let mouseDentro = false;
    let focoDentro = false;

    carrossel.addEventListener('mouseenter', () => { mouseDentro = true; parar(); });
    carrossel.addEventListener('mouseleave', () => { mouseDentro = false; if (!focoDentro) iniciar(); });
    carrossel.addEventListener('focusin', (e) => {
        if (e.target.matches(':focus-visible')) {
            focoDentro = true;
            parar();
        }
    });
    carrossel.addEventListener('focusout', () => {
        focoDentro = false;
        iniciar();
    });

    let inicioX = 0;
    carrossel.addEventListener('touchstart', e => { inicioX = e.touches[0].clientX; parar(); }, { passive: true });
    carrossel.addEventListener('touchend', e => {
        const diferenca = e.changedTouches[0].clientX - inicioX;
        if (Math.abs(diferenca) > 50) irPara(diferenca < 0 ? atual + 1 : atual - 1);
        iniciar();
    });

    irPara(0);
    iniciar();
}