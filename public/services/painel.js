function getUsers() {
    fetch('/users')
      .then(response => response.json())
      .then(users => {
        displayUsers(users);
      })
      .catch(error => console.error('Erro ao buscar usuários:', error));
  }
  function displayUsers(users) {
    const usersTableBody = document.getElementById('users-table-body');
    usersTableBody.innerHTML = '';
    users.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.razaoSocial}</td>
      <td>${user.email}</td>
      <td>${user.cnpj}</td>
      <td>${user.telefone}</td>
      <td>${user.senha}</td>
      <td>
        <button class="btn btn-primary btn-sm mr-2" onclick="editUser('${user.id}')">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="deleteUser('${user.id}')">Excluir</button>
        <button class="btn btn-info btn-sm" onclick="viewPurchases('${user.id}')">Compras</button>
      </td>
    `;
      usersTableBody.appendChild(row);
    });
  }
  // Restante das funções como editUser, deleteUser, viewPurchases...
  window.onload = function () {
    getUsers();
  };
  function deleteUser(userId) {
    fetch(`/users/${userId}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        console.log('Usuário deletado:', data);
        // Implemente a lógica para atualizar a interface após a exclusão do usuário
        // Por exemplo: remover a linha correspondente na tabela
        getUsers(); // Atualiza a lista de usuários após a exclusão
      })
      .catch(error => console.error('Erro ao excluir usuário:', error));
  }

  // Função para editar um usuário pelo ID
  function editUser(userId) {
    fetch(`/users/${userId}`)
      .then(response => response.json())
      .then(user => {
        console.log('Dados do usuário:', user);
        fillEditForm(user); // Preencher formulário de edição com os dados do usuário
      })
      .catch(error => console.error('Erro ao buscar usuário:', error));
  }

  // Função para visualizar as compras de um usuário pelo ID
  function viewPurchases(userId) {
    // Lógica para obter e exibir as compras do usuário com o ID especificado
    // Exemplo simulado com dados estáticos:
    const purchases = [
      { idCompra: 1, idUsuario: userId, valor: 100 },
      { idCompra: 2, idUsuario: userId, valor: 150 },
      // ... adicione outras compras para este usuário
    ];

    const purchasesTableBody = document.getElementById('purchases-table-body');
    purchasesTableBody.innerHTML = '';

    purchases.forEach(purchase => {
      const row = document.createElement('tr');
      row.innerHTML = `
      <td>${purchase.idCompra}</td>
      <td>${purchase.idUsuario}</td>
      <td>${purchase.valor}</td>
      <!-- Adicione mais colunas para informações das compras, se necessário -->
    `;
      purchasesTableBody.appendChild(row);
    });
  }



  function fillEditForm(user) {
    const editForm = document.getElementById('editUserForm');
    editForm.style.display = 'block'; // Mostrar formulário de edição

    // Preencher os campos do formulário com os dados do usuário
    // Por exemplo, se tiver campos de input com IDs 'userId', 'userEmail', etc.:
    document.getElementById('userId').value = user.id;
    document.getElementById('userRazaoSocial').value = user.razaoSocial;
    document.getElementById('userEmail').value = user.email;
    document.getElementById('userCnpj').value = user.cnpj;
    document.getElementById('userTelefone').value = user.telefone;
    document.getElementById('userSenha').value = user.senha;
  }

  function submitEditedUser() {
const userId = document.getElementById('userId').value;
const updatedUser = {
  razaoSocial: document.getElementById('userRazaoSocial').value,
  email: document.getElementById('userEmail').value,
  cnpj: document.getElementById('userCnpj').value,
  telefone: document.getElementById('userTelefone').value,
  senha: document.getElementById('userSenha').value
};

fetch(`/users/${userId}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(updatedUser)
})
  .then(response => response.json())
  .then(data => {
    console.log('Usuário atualizado:', data);
    // Fechar o formulário de edição
    closeEditForm();
    // Atualizar a tabela de usuários
    getUsers(); // Isso irá buscar novamente os usuários e atualizar a tabela na interface
  })
  .catch(error => console.error('Erro ao editar usuário:', error));
}

function closeEditForm() {
const editForm = document.getElementById('editUserForm');
editForm.style.display = 'none'; // Oculta o formulário de edição
}