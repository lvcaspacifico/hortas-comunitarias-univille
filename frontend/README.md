# 🌱 Sistema de Hortas Comunitárias - Frontend

Frontend desenvolvido em Vue.js 3 com Composition API, Vuex e Vue Router.

## � Índice

- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Integração com Backend](#-integração-com-backend)
- [Comandos Disponíveis](#-comandos-disponíveis)
- [Componentes Principais](#-componentes-principais)

---

## �🚀 Instalação

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Backend rodando em `http://localhost:8181`

### Passos

```bash
# 1. Navegar para a pasta do frontend
cd frontend

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env

# 4. Iniciar servidor de desenvolvimento
npm run serve
```

---

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do frontend:

```env
# URL da API Backend
VUE_APP_API_URL=http://localhost:8181/api/v1

# Ambiente
NODE_ENV=development
```

### URLs de Acesso

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8181/api/v1
- **phpMyAdmin:** http://localhost:8080

---

## 🏗️ Estrutura do Projeto

```
frontend/
├── public/              # Arquivos públicos estáticos
│   └── index.html
├── src/
│   ├── assets/          # Imagens, fontes, CSS
│   │   └── main.css
│   ├── components/      # Componentes reutilizáveis
│   │   ├── Navbar.vue
│   │   ├── FormInput.vue
│   │   └── ...
│   ├── router/          # Configuração de rotas Vue Router
│   │   └── index.js
│   ├── services/        # Camada de comunicação com API
│   │   ├── api.js                    # Cliente HTTP base (Axios)
│   │   ├── auth.service.js           # Autenticação
│   │   ├── associacoes.service.js    # CRUD Associações
│   │   ├── hortas.service.js         # CRUD Hortas
│   │   ├── canteiros.service.js      # CRUD Canteiros
│   │   └── ...
│   ├── store/           # Gerenciamento de estado Vuex
│   │   ├── index.js
│   │   └── modules/
│   │       ├── auth.js               # Estado de autenticação
│   │       ├── associacoes.js        # Estado de associações
│   │       ├── hortas.js             # Estado de hortas
│   │       └── ...
│   ├── views/           # Páginas/Views da aplicação
│   │   ├── Home.vue
│   │   ├── Login.vue
│   │   ├── Associacoes/
│   │   ├── Hortas/
│   │   └── ...
│   ├── App.vue          # Componente raiz
│   └── main.js          # Entry point
├── .env                 # Variáveis de ambiente (criar)
├── .env.example         # Exemplo de variáveis
├── package.json
└── vite.config.js
```

---

## 🔗 Integração com Backend

### Autenticação

O sistema usa **JWT (JSON Web Token)** para autenticação.

#### Fluxo de Login

1. Usuário preenche email e senha
2. Frontend envia `POST /api/v1/sessoes/login`
3. Backend retorna token JWT
4. Token é armazenado no localStorage
5. Token é enviado em todas as requisições subsequentes

#### Exemplo de Login

```javascript
import { useStore } from 'vuex'

const store = useStore()

const login = async () => {
  const result = await store.dispatch('auth/login', {
    email: 'usuario@email.com',
    senha: 'senha123'
  })

  if (result.success) {
    router.push('/')
  } else {
    alert(result.message)
  }
}
```

### Serviços API

Todos os serviços estendem o cliente HTTP configurado em `api.js`:

```javascript
// src/services/exemplo.service.js
import api from './api'

export default {
  getAll(params = {}) {
    return api.get('/exemplos', { params })
  },

  getById(id) {
    return api.get(`/exemplos/${id}`)
  },

  create(data) {
    return api.post('/exemplos', data)
  },

  update(id, data) {
    return api.put(`/exemplos/${id}`, data)
  },

  delete(id) {
    return api.delete(`/exemplos/${id}`)
  }
}
```

### Interceptadores

O arquivo `api.js` configura interceptadores automaticamente:

- **Request:** Adiciona token JWT em todas as requisições
- **Response:** Redireciona para login se receber 401 Unauthorized

---

## 📝 Comandos Disponíveis

```bash
# Desenvolvimento
npm run serve            # Inicia servidor de desenvolvimento (porta 3000)

# Build para produção
npm run build            # Gera build otimizado em /dist

# Testes
npm run test:unit        # Executa testes unitários
npm run test:e2e         # Executa testes E2E

# Qualidade de código
npm run lint             # Verifica código com ESLint
npm run lint --fix       # Corrige problemas automaticamente
```

---

## 🧩 Componentes Principais

### Navbar

Barra de navegação com menu e logout.

```vue
<Navbar />
```

### FormInput

Campo de formulário reutilizável com validação.

```vue
<FormInput
  id="email"
  v-model="form.email"
  label="Email"
  type="email"
  placeholder="seu@email.com"
  :required="true"
  :error="errors.email"
/>
```

### Views

- **Home.vue:** Dashboard principal
- **Login.vue:** Tela de login
- **Associacoes/List.vue:** Lista de associações
- **Hortas/List.vue:** Lista de hortas
- **Canteiros/List.vue:** Lista de canteiros

---

## 🔒 Proteção de Rotas

Rotas protegidas requerem autenticação:

```javascript
{
  path: '/associacoes',
  component: AssociacoesList,
  meta: { requiresAuth: true }  // Requer login
}
```

O router verifica automaticamente a autenticação antes de navegar.

---

## 🐛 Troubleshooting

### Erro: "Erro de conexão"

- ✅ Verifique se o backend está rodando em `http://localhost:8181`
- ✅ Verifique o arquivo `.env`

### Erro: "401 Unauthorized"

- ✅ Token expirado - faça login novamente
- ✅ Verifique se o token está sendo enviado nos headers

### Erro: "404 Not Found"

- ✅ Verifique a rota da API
- ✅ Confirme que a rota existe no backend

### CORS Error

- ✅ Configure headers CORS no backend
- ✅ Verifique se o backend aceita a origem do frontend

---

## 📚 Documentação Adicional

- [Guia de Integração Completo](./INTEGRACAO.md)
- [Documentação da API Backend](../docs/api/README.md)
- [Vue 3 Docs](https://vuejs.org/)
- [Vuex Docs](https://vuex.vuejs.org/)
- [Vue Router Docs](https://router.vuejs.org/)
- [Axios Docs](https://axios-http.com/)

---

## 👨‍💻 Desenvolvimento

### Adicionar Nova Funcionalidade

1. Criar serviço em `src/services/`
2. Criar módulo Vuex em `src/store/modules/` (opcional)
3. Criar views em `src/views/`
4. Adicionar rotas em `src/router/index.js`

### Exemplo Completo

Consulte o arquivo [INTEGRACAO.md](./INTEGRACAO.md) para exemplos detalhados de:

- Criar novos serviços
- Implementar módulos Vuex
- Usar APIs nos componentes
- Tratamento de erros

---

## 🎨 Tecnologias Utilizadas

- **Vue.js 3** - Framework progressivo
- **Vuex 4** - Gerenciamento de estado
- **Vue Router 4** - Roteamento
- **Axios** - Cliente HTTP
- **Bootstrap 5** - Framework CSS
- **Leaflet** - Mapas interativos
- **Font Awesome** - Ícones

---

**Desenvolvido por:** Felipe  
**Versão:** 1.0.0  
**Última atualização:** 02/11/2025
