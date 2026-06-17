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
        if (entry.isIntersecting) {
            const idSecao = entry.target.getAttribute('id');

            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });

            const linksAtivos = document.querySelectorAll(`a[href="#${idSecao}"]`);
            linksAtivos.forEach(link => {
                link.parentElement.classList.add('active');
            });
        }
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

ScrollReveal().reveal('.l', {
    origin: 'right',
    duration: duracaoAnimacao,
    distance: '10%'
})

ScrollReveal().reveal('.r', {
    origin: 'left',
    duration: duracaoAnimacao,
    distance: '10%'
})

ScrollReveal().reveal('#portfolio', {
    origin: 'left',
    duration: 2000,
    distance: '2%'
})