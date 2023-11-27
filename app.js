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
    email: "dev@alugueaki.com.br",
    cnpj: "00000000000191",
    telefone: "21968886093",
    senha: "dev@123456"
  },
];

// Rota para obter todos os usuários (apenas para exemplo)
app.get('/users', (request, response) => {
  response.json(database);
});

// Rota para cadastrar um novo usuário
app.post("/users", (request, response) => {
  const body = request.body;

  // Verificando se já existe um usuário com o mesmo e-mail
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

  // Configurando um cookie para indicar que o usuário está autenticado
  res.cookie('loggedIn', 'true', { httpOnly: true });
  res.json({ message: 'Login bem-sucedido!', user });
});

// Rota para fazer logout
app.get('/logout', (req, res) => {
  res.clearCookie('loggedIn');
  res.redirect('/'); // Redirecionar para a página inicial após o logout
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
