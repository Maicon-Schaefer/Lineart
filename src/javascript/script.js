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
    rootMargin: '-20% 0px -60% 0px',
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