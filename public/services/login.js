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
            feedbackDiv.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
<path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
</svg> Acesso concedido!`;

            feedbackDiv.style.backgroundColor = 'green';
            feedbackDiv.style.color = 'white';
            feedbackDiv.style.visibility = 'visible';
            feedbackDiv.style.opacity = '1';

            setTimeout(function () {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            feedbackDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
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
<path d="M7.652.133a1.25 1.25 0 0 1 1.696 0l6.5 5.5A1.25 1.25 0 0 1 15 7.797v6.453a1.25 1.25 0 0 1-1.152 1.244l-6.5 5.5a1.25 1.25 0 0 1-1.696 0l-6.5-5.5A1.25 1.25 0 0 1 0 14.25V7.797a1.25 1.25 0 0 1 1.152-1.244l6.5-5.5zM7.25 11a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm.02-6.3a.837.837 0 0 1 .96.133c.295.235.36.67.154 1.014l-.063.087-.823 1.237c-.178.267-.515.42-.858.42h-.027c-.344 0-.68-.153-.86-.42l-.822-1.237-.062-.087a.836.836 0 0 1 .153-1.014.83.83 0 0 1 1.023 0zm-.002 4.4a1 1 0 1 0-2 0 1 1 0 0 0 2 0z"/>
</svg> Erro ao tentar fazer login!`;

        feedbackDiv.style.backgroundColor = 'red';
        feedbackDiv.style.color = 'white';
        feedbackDiv.style.visibility = 'visible';
        feedbackDiv.style.opacity = '1';
    }
});