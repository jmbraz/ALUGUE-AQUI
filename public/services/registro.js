const form = document.getElementById('userForm');
const feedbackDiv = document.getElementById('registerFeedback');
const btnCadastrar = document.getElementById('btnCadastrar');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const razaoSocial = document.getElementById('razaoSocial').value;
    const email = document.getElementById('email').value;
    const cnpj = document.getElementById('cnpj').value;
    const telefone = document.getElementById('telefone').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;

    try {
        const response = await fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ razaoSocial, email, cnpj, telefone, senha, confirmarSenha })
        });

        const data = await response.json();
        console.log('Resposta do cadastro:', data);

        if (response.ok) {
            feedbackDiv.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
</svg> Cadastro sucedido!`;
            feedbackDiv.style.backgroundColor = 'green';
            feedbackDiv.style.color = 'white';
            feedbackDiv.style.visibility = 'visible';
            feedbackDiv.style.opacity = '1';

            // Redirecionamento para login.html após 2 segundos
            setTimeout(function () {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            feedbackDiv.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg>` + (data.error || 'Erro ao cadastrar!');
            feedbackDiv.style.backgroundColor = 'red';
            feedbackDiv.style.color = 'white';
            feedbackDiv.style.visibility = 'visible';
            feedbackDiv.style.opacity = '1';
        }

    } catch (error) {
        console.error('Erro no cadastro:', error);
        feedbackDiv.innerHTML = 'Erro ao tentar cadastrar!';
        feedbackDiv.style.backgroundColor = 'red';
        feedbackDiv.style.color = 'white';
        feedbackDiv.style.visibility = 'visible';
        feedbackDiv.style.opacity = '1';
    }
});