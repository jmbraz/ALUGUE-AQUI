const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

let database = [
  {
    id: "1",
    razaoSocial: "dev",
    email: "dev@alugueaqui.com.br",
    cnpj: "00000000000000",
    telefone: "(21)96888-6093",
    senha: "dev@123456"
  },
];

// Rota para obter todos os usuários (apenas para exemplo)
app.get('/users', (request, response) => {
  response.json(database);
});

// Rota para obter um usuário pelo ID
app.get('/users/:id', (request, response) => {
  const userId = request.params.id;
  const user = database.find(user => user.id === userId);

  if (!user) {
    return response.status(404).json({ error: 'Usuário não encontrado' });
  }

  response.json(user);
});

// Rota para cadastrar um novo usuário
app.post("/users", (request, response) => {
  const body = request.body;

  const existingUser = database.find(user => user.email === body.email);
  if (existingUser) {
    return response.status(400).json({ error: 'Esta conta já foi cadastrada' });
  }

  const newUser = {
    id: (database.length + 1).toString(),
    razaoSocial: body.razaoSocial,
    email: body.email,
    cnpj: body.cnpj,
    telefone: body.telefone,
    senha: body.senha
  };

  database.push(newUser);
  response.json({ message: 'Cadastro sucedido!', user: newUser });
});

// Rota para fazer login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  const user = database.find(user => user.email === email && user.senha === senha);

  if (!user) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  res.cookie('loggedIn', 'true', { httpOnly: true });
  res.json({ message: 'Login bem-sucedido!', user });
});

// Rota para fazer logout
app.get('/logout', (req, res) => {
  res.clearCookie('loggedIn');
  res.redirect('/'); 
});

// Rota para atualizar um usuário pelo ID usando o método PATCH
app.patch('/users/:id', (request, response) => {
  const userId = request.params.id;
  const body = request.body;

  let userIndex = database.findIndex(user => user.id === userId);

  if (userIndex === -1) {
    return response.status(404).json({ error: 'Usuário não encontrado' });
  }

  database[userIndex] = { ...database[userIndex], ...body };

  response.json({ message: 'Informações do usuário atualizadas com sucesso', user: database[userIndex] });
});

// Rota para deletar um usuário pelo ID
app.delete('/users/:id', (request, response) => {
  const userId = request.params.id;
  const userIndex = database.findIndex(user => user.id === userId);

  if (userIndex === -1) {
    return response.status(404).json({ error: 'Usuário não encontrado' });
  }

  const deletedUser = database.splice(userIndex, 1);

  response.json({ message: 'Usuário deletado com sucesso', deletedUser });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
