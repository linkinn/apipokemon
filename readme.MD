![](https://github.com/linkinn/apipokemon/blob/master/public/img/logo.png)

# Tecnologias

---

Esse projeto foi desenvolvido com as seguintes tecnologias.

 - [NodeJS](https://nodejs.org/en/)
 - [ExpressJS](https://expressjs.com/pt-br/)
 - [MongoDB](https://www.mongodb.com/)
 - [JWT](https://jwt.io/)
 - [Jest](https://jestjs.io/)
 - [Eslint](https://eslint.org/)
 - [Docker](https://www.docker.com/)

# Projeto

---

O api pokemon é um projeto com o objetivo de melhorar minhas habilidades e treinar meu conhecimento

### Configurando ambiente

---

 - Instalar o [NodeJS](https://nodejs.org/en/)
 - Instalar o [Npm](https://www.npmjs.com/)

### Instalando container do mongodb

---

Apos instalação do [Docker](https://www.docker.com/) rodar o seguinte comando no terminal:

```
docker run --name mongodb -p 27017:27017 -d -t mongo
```

OBS: A porta 27017 nao pode estar em uso, se nao ocorrerá um error.

### Clonando projeto e configurando

---

 - Clonando o projeto do github

```
git clone https://github.com/linkinn/apipokemon.git
```

 - Instalando todas as dependencias

```
npm i
```

 - Criar o arquivo .env na raiz do projeto, e usar os nomes da variaveis com os nomes que estao no .env.example

### Testes

Apos projeto pronto, podemos iniciar os teste com o seguinte comando

```
npm run test
```

### Iniciando aplicação

Na pasta dev-data temos dois arquivos json e um arquivo js, que tem como funcionalidade importar as informações dos arquivos json para o mongodb e tambem deletar.

Importar os dados:

```
node dev-data/import-data.js --import
```

OBS: Antes de importar os dados devemos comentar o seguinte trecho de codigo, que se encontra dentro de src/app/schemas/userSchemas.js, devido a criação das senhas. Apos importar os dados podemos descomentar

Senhas dos usuarios: test1234

```
userSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});
```

Deletar os dados:

```
node dev-data/import-data.js --delete
```

Apos importações dos dados podemos manipular e testar a aplicação, para isso rodamos o comando:

```
npm run start
```

### Endpoints

 - Usuarios

```
base_url: http://localhost:3000/api/v1/users

registro = POST / {{base_url}}/signup
login = POST / {{base_url}}/login

##########################################

// Rotas protegidas, acesso somente com token valido

sobre o usuario = GET /  {{base_url}}/me
atualizar informações = PATCH /  {{base_url}}/me
atualizar senha = PATCH / {{base_utl}}/updateMyPassword
```

 - Pokemons

```
// Rotas protegidas, acesso somente com token valido

base_url: http://localhost:3000/api/v1/pokemons

mostrar todos prokemon = GET / {{base_url}}/
mostrar pokemon especifico = GET / {{base_url}}/IDPokemon
criar um pokemon = POST / {{base_url}}/
atualizar um pokemon = PATCH / {{base_url}}/IDPokemon
deletar um pokemon = DELETE / {{base_url}}/IDPokemon
```


