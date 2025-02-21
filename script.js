function createStar() {
    const star = document.createElement('div');
    star.className = 'star';

    // Define a posição horizontal aleatória
    const posX = Math.random() * window.innerWidth;
    star.style.left = `${posX}px`;

    // Define um tempo de animação aleatória
    const duration = Math.random() * 1 + 3; // Entre 3 e 5 segundos
    star.style.animationDuration = `${duration}s`;

    document.body.appendChild(star);

    // Remove a estrela após a animação para evitar acúmulo de elementos
    star.addEventListener('animationend', () => {
        star.remove();
    });
}

// Chama a função createStar em intervalos regulares
setInterval(createStar, 100); // Cria uma nova estrela a cada 300ms



                    /*=======================================
                    Função para rolagem suave personalizada
                    =========================================*/

function smoothScroll(target, duration) {
    const targetElement = document.querySelector(target);
    const navbarHeight = document.querySelector('.navbar').offsetHeight; // Altura da navbar
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight; // Ajusta a posição
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1); // Normaliza o progresso entre 0 e 1

        // Efeito de easing (opcional)
        const ease = progress * (2 - progress); // Easing quadrático

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation); // Continua a animação
        }
    }

    requestAnimationFrame(animation); // Inicia a animação
}

document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Impede o comportamento padrão do link
        smoothScroll(this.getAttribute('href'), 1000); // Chama a função com duração de 1000ms (1 segundo)
    });
});
