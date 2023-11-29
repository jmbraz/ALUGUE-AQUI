async function fetchGitHubUsers(usernames) {
  const container = document.querySelector('.github-users');
  try {
    const promises = usernames.map(username =>
      fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
    );

    const users = await Promise.all(promises);

    users.forEach(user => {
      const userDiv = document.createElement('a');
      userDiv.classList.add('github-user');
      userDiv.href = user.html_url;

      const userImage = document.createElement('img');
      userImage.src = user.avatar_url;
      userImage.alt = `${user.login} Perfil`;

      const userName = document.createElement('p');
      userName.textContent = user.name || user.login; // Usa o nome se estiver disponível, senão usa o login

      userDiv.appendChild(userImage);
      userDiv.appendChild(userName);

      container.appendChild(userDiv);
    });
  } catch (error) {
    console.error('Erro ao buscar usuários do GitHub:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const userList = ['jmbraz', 'NaoExisto', 'Alephelouzada', 'Danielassuncao99'];
  fetchGitHubUsers(userList);
});

// Restante do seu código


  document.addEventListener('DOMContentLoaded', () => {
const section1 = document.getElementById('section1-content');
const section2 = document.getElementById('section2-content');

document.getElementById('section1').addEventListener('click', () => {
  section1.style.opacity = 1;
  section2.style.opacity = 0;
});

document.getElementById('section2').addEventListener('click', () => {
  section1.style.opacity = 0;
  section2.style.opacity = 1;
});
});