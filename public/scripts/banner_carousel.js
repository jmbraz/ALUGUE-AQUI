
let slideIndex = 1;
showSlides(slideIndex);

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName('banner-container');
  const dots = document.getElementsByClassName('dot');

  if (n > slides.length) {
    slideIndex = 1;
  }

  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '');
  }

  slides[slideIndex - 1].style.display = 'block';
  dots[slideIndex - 1].className += ' active';
}

// Função para avançar automaticamente os slides a cada 5 segundos
function autoPlay() {
  setInterval(() => {
    showSlides((slideIndex += 1));
  }, 5000); // Altere o tempo aqui para controlar o intervalo entre os slides (em milissegundos)
}

autoPlay(); // Iniciar o carrossel automaticamente