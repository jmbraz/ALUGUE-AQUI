window.onload = function() {
    const greetingDiv = document.getElementById('greetingDiv');

    // Verificar se o usuário está autenticado (pode ser feito de diferentes maneiras, como cookies ou tokens)
    const loggedIn = /* Verificar se o usuário está autenticado */;

    if (loggedIn) {
        // Obter o nome do usuário (razaoSocial) e exibir a saudação
        const nomeUsuario = /* Obter o nome do usuário */;
        greetingDiv.innerHTML = `Olá, ${nomeUsuario}!`;
    } else {
        // Se não estiver autenticado, redirecionar para a página de login
        window.location.href = '../login.html'; // Corrigindo o caminho do redirecionamento
    }
};

const performLogout = async () => {
    try {
        const response = await fetch('/logout', {
            method: 'GET' // ou 'POST', dependendo da sua configuração no servidor
        });

        if (response.ok) {
            window.location.href = './login.html'; // Corrigindo o caminho do redirecionamento após logout
        } else {
            // Lógica de tratamento caso o logout falhe
        }
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
    }
};
