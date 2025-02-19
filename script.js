function randomPosition() {
    const x = Math.random() * window.innerWidth;
    return x; // Apenas a posição horizontal é necessária para as estrelas cadentes
}

function createStars(numStars) {
    const sky = document.querySelector('.sky');

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        const x = randomPosition();
        star.style.width = `${Math.random() * 3 + 2}px`;
        star.style.height = star.style.width; // Mantém a proporção circular
        star.style.left = `${x}px`;
        
        // Inicia as estrelas acima da tela
        star.style.top = `${Math.random() * -100}px`; // Começa acima da tela

        // Animação de aproximação
        const speed = Math.random() * 10 + 2; // Velocidade aleatória
        setInterval(() => {
            const newY = parseFloat(star.style.top) + speed;
            if (newY > window.innerHeight + 100) { // Reinicia quando sai da tela
                star.style.top = `${Math.random() * -100}px`; // Reinicia a posição vertical
                star.style.left = `${randomPosition()}px`; // Reinicia a posição horizontal
            } else {
                star.style.top = `${newY}px`;
            }
        }, 22);

        // Animação de brilho
        star.style.animation = `twinkle ${Math.random() * 5 + 1}s infinite`;

        // Adiciona a estrela ao contêiner
        sky.appendChild(star);

        // Adiciona o efeito de estrela cadente aleatoriamente
        if (Math.random() < 0.1) { // Aproximadamente 10% das estrelas serão cadentes
            setTimeout(() => {
                star.classList.add('cadente'); // Adiciona a classe cadente
                setTimeout(() => {
                    star.remove(); // Remove a estrela após a animação
                }, 1000); // Tempo da animação de queda
            }, Math.random() * 3000); // Inicia a animação em um tempo aleatório
        }
    }
}

// Chame a função com um número maior de estrelas
createStars(68); // Altere esse número para aumentar ou diminuir a quantidade de estrelas


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