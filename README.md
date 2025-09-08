# PontoPro RH - Sistema de Gerenciamento de Funcionários

![PontoPro RH](https://img.shields.io/badge/PontoPro%20RH-v1.0.0-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)

---

## 📋 Sobre o Projeto

O **PontoPro RH** é uma **aplicação full-stack** completa e moderna para gerenciamento de Recursos Humanos (RH). O projeto é composto por um **front-end** intuitivo em HTML, CSS e JavaScript e um **back-end robusto** construído com Node.js e Express.

Ele oferece uma interface completa para administração de funcionários, com funcionalidades que incluem cadastro, login seguro, e gerenciamento de dados persistentes em um banco de dados MongoDB.

---

## ✨ Funcionalidades Principais

- **Sistema de Autenticação Completo**

  - Login seguro com validação de credenciais.
  - Autenticação via **JWT (JSON Web Tokens)**.
  - Senhas criptografadas com **Bcrypt.js**.
  - Armazenamento de sessão no Local Storage para persistência.
  - Proteção de rotas e redirecionamento automático.

- **Dashboard Interativo**

  - Visão geral com estatísticas em tempo real (total de funcionários, ativos, departamentos).
  - Lista de funcionários recentes e ações rápidas.
  - Gráficos de distribuição por departamento.

- **Gerenciamento de Funcionários**

  - Listagem completa com filtros avançados (nome, departamento, status).
  - Cadastro, edição e exclusão de funcionários.
  - Validação de formulários e máscaras automáticas (telefone e CPF).

- **Configurações Administrativas**
  - Gerenciamento de perfil, senha e dados da empresa.

---

## 🛠️ Tecnologias Utilizadas

### Front-end

- **HTML5**: Estrutura semântica do projeto.
- **CSS3**: Estilização moderna, com ênfase em **CSS Grid, Flexbox e Media Queries** para um design responsivo.
- **JavaScript ES6+**: Lógica de negócio, validações e interatividade no cliente.
- **Local Storage**: Armazenamento temporário de dados e sessão no navegador.
- **Vite**: Ferramenta de build para desenvolvimento front-end.

### Back-end

- **Node.js**: Ambiente de execução para o servidor.
- **Express.js**: Framework para construção das APIs RESTful.
- **MongoDB**: Banco de dados NoSQL para persistência dos dados.
- **Mongoose**: Modelagem de dados para o MongoDB.
- **Bcrypt.js**: Criptografia de senhas para segurança.
- **JSON Web Token (JWT)**: Geração de tokens de autenticação.
- **CORS**: Middleware para permitir requisições de diferentes origens.
- **Dotenv**: Gerenciamento de variáveis de ambiente.
- **Joi**: Validação de dados de entrada (schemas).
- **Multer**: Middleware para upload de arquivos.
- **Nodemailer**: Módulo para envio de e-mails.

---

## 📁 Estrutura do Projeto

```
/
├── PontoPro-Backend/
│   ├── app.js                # Configuracao do projeto
│   ├── server.js             # Arquivo principal do servidor.
│   ├── routes/               # Rotas da API.
│   ├── models/               # Modelos de dados (Mongoose).
│   ├── controllers/          # Lógica de negócio da aplicação.
│   ├── services.js           # Configuracao do nodemailer e outros futuros servicos
│   ├── .env                  # Variaveis de ambiente 
│   └── ...
├── Vite-PontoPro/
│   ├── public/               # Arquivos estáticos (imagens, etc.).
│   ├── app/                  # Código fonte do front-end.
│   ├── index.html            # Arquivo HTML principal do Vite.
│   ├── css/                  # Pastas de estilos de css.
│   ├── js/                   # Arquivos de Js como index.js - logica de login
│   ├── .env                  # Variaveis de ambiente 
│   └── ...
└── README.md

```

## 🚀 Como Executar

1.  **Clone os repositórios**:

    ```bash
    git clone [https://github.com/HigorSouzaa/Vite-PontoPro.git](https://github.com/HigorSouzaa/Vite-PontoPro.git)
    cd Vite-PontoPro
    ```

    ```bash
    git clone [https://github.com/HigorSouzaa/PontoPro-Backend.git](https://github.com/HigorSouzaa/PontoPro-Backend.git)
    cd PontoPro-Backend
    ```

2.  **Instale as dependências do back-end**:

    ```bash
    cd PontoPro-Backend
    npm install
    ```

3.  **Configure o arquivo `.env`**:

    - Crie um arquivo `.env` na pasta `PontoPro-Backend` com as seguintes variáveis de ambiente:
      ```env
      PORT=3000
      MONGO_URI=sua_string_de_conexao_mongodb
      JWT_SECRET=sua_chave_secreta_jwt
      ```

4.  **Inicie o servidor**:

    ```bash
    npm run dev  # ou 'npm start' dependendo do script
    ```

5.  **Acesse o front-end e instale as dependências do VITE**:

    ```bash
    npm install
    ```

6. **Inicie o servidor do VITE**:

    ```bash
    npm run dev  
    ```

7. **Acesso pelo link de desenvovimento no terminal**

    Ex: ➜  Local:   http://localhost:5173/
   

---

## 🔒 Segurança e Dados

- **Armazenamento de Dados**: Os dados são persistidos de forma segura no **MongoDB**, com a modelagem realizada pelo **Mongoose**.
- **Validações**: O sistema utiliza **Joi** para validar os dados de entrada no backend, garantindo que apenas informações corretas sejam processadas.
- **Autenticação Segura**: A autenticação é feita com **JWT**, e as senhas dos usuários são protegidas com **Bcrypt.js** para criptografia.

---

## 🚧 Melhorias Futuras

- [ ] Sistema de relatórios (Geração, Histórico e Download).
- [ ] Gerenciamento de departamentos.
- [ ] Configurações de sistema (tema, notificações, formato de data).
- [ ] Dashboard com **gráficos interativos** (e.g., usando Chart.js).
- [ ] **Controle de ponto** integrado.
- [ ] Exportação de relatórios em **PDF real**.
- [ ] Sistema de **permissões** baseado em papéis de usuário.
- [ ] Implementação de testes automatizados.
