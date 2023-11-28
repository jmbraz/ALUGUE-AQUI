const form = document.getElementById('loginForm');
const feedbackDiv = document.getElementById('feedbackDiv');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();
        console.log('Resposta do login:', data);

        if (response.ok) {
            feedbackDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
              <!-- ... Ícone de check ... -->
            </svg> Acesso concedido!`;

            feedbackDiv.style.backgroundColor = 'green';
            feedbackDiv.style.color = 'white';
            feedbackDiv.style.visibility = 'visible';
            feedbackDiv.style.opacity = '1';

            setTimeout(function () {
                window.location.href = 'dashboard.html';
            }, 2000);
        } else {
            feedbackDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
              <!-- ... Ícone de erro ... -->
            </svg> ${data.error || 'Acesso negado!'}`;

            feedbackDiv.style.backgroundColor = 'red';
            feedbackDiv.style.color = 'white';
            feedbackDiv.style.visibility = 'visible';
            feedbackDiv.style.opacity = '1';
        }

        if (feedbackDiv.textContent === '') {
            feedbackDiv.style.visibility = 'hidden';
            feedbackDiv.style.opacity = '0';
        }
    } catch (error) {
        console.error('Erro no login:', error);
        feedbackDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="bi bi-exclamation-triangle-fill" width="16" height="16" fill="red" viewBox="0 0 16 16">
          <!-- ... Ícone de erro ... -->
        </svg> Erro ao tentar fazer login!`;

        feedbackDiv.style.backgroundColor = 'red';
        feedbackDiv.style.color = 'white';
        feedbackDiv.style.visibility = 'visible';
        feedbackDiv.style.opacity = '1';
    }
});
