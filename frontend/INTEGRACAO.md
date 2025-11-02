# 🔗 Guia de Integração Frontend → Backend

## ✅ Status da Integração

### Implementado:

- ✅ Configuração da URL base da API (`http://localhost:8181/api/v1`)
- ✅ Serviço de autenticação (`auth.service.js`)
- ✅ Módulo Vuex de autenticação atualizado
- ✅ Login funcional com API real
- ✅ Interceptadores de requisição (JWT automático)
- ✅ Tratamento de erros de API
- ✅ Variáveis de ambiente (.env)

---

## 🚀 Como Usar

### 1. Configurar o Backend

Certifique-se de que o backend está rodando:

```bash
# Opção 1: Docker (recomendado)
docker-compose up -d nginx php mysql phpmyadmin

# Opção 2: Local
cd backend
php -S localhost:8181 -t public public/index.php
```

**URLs importantes:**

- Backend API: http://localhost:8181/api/v1
- phpMyAdmin: http://localhost:8080

### 2. Configurar o Frontend

```bash
cd frontend

# Instalar dependências (se ainda não fez)
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Rodar o frontend
npm run serve
```

O frontend rodará em: http://localhost:3000

### 3. Testar o Login

Use as credenciais de um usuário cadastrado no banco:

```json
{
  "email": "usuario@email.com",
  "senha": "senha123"
}
```

---

## 📡 Estrutura da API

### Autenticação

#### Login

- **Rota:** `POST /api/v1/sessoes/login`
- **Body:**

```json
{
  "email": "usuario@email.com",
  "senha": "senha123"
}
```

- **Resposta:**

```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

#### Cadastro

- **Rota:** `POST /api/v1/sessoes/cadastro`
- **Body:**

```json
{
  "associacao": {
    "cnpj": "12345678000190",
    "razao_social": "Associação Teste",
    "nome_fantasia": "Teste"
  },
  "usuario": {
    "nome_completo": "João da Silva",
    "apelido": "João",
    "email": "joao@email.com",
    "senha": "senha123",
    "cpf": "12345678901",
    "data_de_nascimento": "1990-01-01"
  }
}
```

### Outros Recursos

Todos os recursos seguem o padrão RESTful com autenticação JWT:

- **Associações:** `/api/v1/associacoes`
- **Hortas:** `/api/v1/hortas`
- **Canteiros:** `/api/v1/canteiros`
- **Usuários:** `/api/v1/usuarios`

**Métodos disponíveis:**

- `GET /` - Listar todos
- `GET /{uuid}` - Buscar por UUID
- `POST /` - Criar novo
- `PUT /{uuid}` - Atualizar
- `DELETE /{uuid}` - Deletar

---

## 🔧 Arquivos Principais

### Serviços (`/src/services/`)

#### `api.js` - Cliente HTTP Base

- Configuração do Axios
- URL base da API
- Interceptadores para JWT e erros

#### `auth.service.js` - Autenticação

- Login
- Cadastro
- Logout
- Tratamento de erros

#### `*.service.js` - Outros serviços

Cada recurso tem seu serviço:

- `associacoes.service.js`
- `hortas.service.js`
- `canteiros.service.js`
- etc.

### Vuex Store (`/src/store/modules/`)

#### `auth.js` - Estado de autenticação

- State: `user`, `token`, `isAuthenticated`
- Actions: `login`, `cadastro`, `logout`
- Mutations: `SET_USER`, `SET_TOKEN`, `LOGOUT`

---

## 💡 Como Adicionar Novas Funcionalidades

### 1. Criar um novo serviço

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

### 2. Criar módulo Vuex (opcional)

```javascript
// src/store/modules/exemplo.js
import exemploService from '@/services/exemplo.service'

const state = {
  items: [],
  currentItem: null
}

const getters = {
  allItems: state => state.items,
  currentItem: state => state.currentItem
}

const mutations = {
  SET_ITEMS(state, items) {
    state.items = items
  },
  SET_CURRENT_ITEM(state, item) {
    state.currentItem = item
  }
}

const actions = {
  async fetchAll({ commit }) {
    try {
      const response = await exemploService.getAll()
      commit('SET_ITEMS', response.data)
      return { success: true }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },

  async fetchById({ commit }, id) {
    try {
      const response = await exemploService.getById(id)
      commit('SET_CURRENT_ITEM', response.data)
      return { success: true }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
```

### 3. Usar no componente Vue

```vue
<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import exemploService from '@/services/exemplo.service'

export default {
  setup() {
    const store = useStore()
    const items = ref([])
    const loading = ref(false)
    const error = ref('')

    const loadItems = async () => {
      loading.value = true
      error.value = ''

      try {
        // Opção 1: Usar serviço diretamente
        const response = await exemploService.getAll()
        items.value = response.data

        // Opção 2: Usar Vuex
        // const result = await store.dispatch('exemplo/fetchAll')
        // items.value = store.getters['exemplo/allItems']
      } catch (err) {
        error.value = 'Erro ao carregar itens'
        console.error(err)
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      loadItems()
    })

    return {
      items,
      loading,
      error,
      loadItems
    }
  }
}
</script>
```

---

## 🔒 Autenticação JWT

### Como funciona

1. **Login:** Usuário faz login → API retorna token JWT
2. **Armazenamento:** Token é salvo no localStorage
3. **Requisições:** Interceptador adiciona token em todas as requisições
4. **Autorização:** Backend valida o token em cada requisição

### Interceptadores

O arquivo `api.js` configura interceptadores automaticamente:

```javascript
// Request Interceptor - Adiciona token JWT
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

// Response Interceptor - Trata erro 401
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

---

## 🛠️ Troubleshooting

### Erro: "Erro de conexão"

- ✅ Verifique se o backend está rodando em `http://localhost:8181`
- ✅ Verifique se o MySQL está rodando
- ✅ Verifique se as migrações foram executadas

### Erro: "401 Unauthorized"

- ✅ Token expirado ou inválido
- ✅ Faça login novamente
- ✅ Verifique se o token está sendo enviado nos headers

### Erro: "404 Not Found"

- ✅ Verifique a URL da rota
- ✅ Confirme que a rota existe no backend
- ✅ Verifique se está usando `/api/v1/` no início

### CORS Error

- ✅ Configure o backend para aceitar requisições do frontend
- ✅ Adicione headers CORS no backend PHP

---

## 📚 Recursos Úteis

- [Documentação da API](../docs/api/README.md)
- [Documentação do Banco](../docs/db/README.md)
- [Vue 3 Docs](https://vuejs.org/)
- [Vuex Docs](https://vuex.vuejs.org/)
- [Axios Docs](https://axios-http.com/)

---

## 🎯 Próximos Passos

1. ✅ Implementar tela de cadastro
2. ✅ Implementar listagem de associações
3. ✅ Implementar CRUD de hortas
4. ✅ Implementar CRUD de canteiros
5. ✅ Implementar sistema de notificações
6. ✅ Implementar dashboard com estatísticas

---

**Desenvolvido por:** Felipe Mourão  
**Data:** 01/11/2025  
**Versão:** 1.0
