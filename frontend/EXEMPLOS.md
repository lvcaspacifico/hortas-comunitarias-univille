# 🎓 Exemplos Práticos de Uso da API

Este documento contém exemplos práticos de como usar os serviços da API no frontend.

---

## 📋 Índice

1. [Login e Autenticação](#1-login-e-autenticação)
2. [Listar Recursos](#2-listar-recursos)
3. [Criar Novo Recurso](#3-criar-novo-recurso)
4. [Atualizar Recurso](#4-atualizar-recurso)
5. [Deletar Recurso](#5-deletar-recurso)
6. [Tratamento de Erros](#6-tratamento-de-erros)

---

## 1. Login e Autenticação

### Exemplo: Componente de Login

```vue
<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin">
      <div v-if="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>

      <input v-model="form.email" type="email" placeholder="Email" required />

      <input
        v-model="form.password"
        type="password"
        placeholder="Senha"
        required
      />

      <button type="submit" :disabled="loading">
        {{ loading ? 'Entrando...' : 'Entrar' }}
      </button>
    </form>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()

    const form = reactive({
      email: '',
      password: ''
    })

    const loading = ref(false)
    const errorMessage = ref('')

    const handleLogin = async () => {
      loading.value = true
      errorMessage.value = ''

      try {
        const result = await store.dispatch('auth/login', {
          email: form.email,
          senha: form.password
        })

        if (result.success) {
          router.push('/')
        } else {
          errorMessage.value = result.message
        }
      } catch (error) {
        errorMessage.value = 'Erro ao conectar com o servidor'
      } finally {
        loading.value = false
      }
    }

    return {
      form,
      loading,
      errorMessage,
      handleLogin
    }
  }
}
</script>
```

---

## 2. Listar Recursos

### Exemplo A: Usando Vuex Store

```vue
<template>
  <div class="hortas-list">
    <h2>Lista de Hortas</h2>

    <!-- Loading -->
    <div v-if="loading" class="text-center">
      <div class="spinner-border"></div>
    </div>

    <!-- Lista -->
    <div v-else-if="hortas.length > 0">
      <div v-for="horta in hortas" :key="horta.uuid" class="card mb-3">
        <div class="card-body">
          <h5>{{ horta.nome }}</h5>
          <p>{{ horta.descricao }}</p>
        </div>
      </div>
    </div>

    <!-- Vazio -->
    <div v-else class="alert alert-info">Nenhuma horta cadastrada</div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    // Computed properties do store
    const hortas = computed(() => store.getters['hortas/allHortas'])
    const loading = computed(() => store.getters['hortas/isLoading'])

    // Carregar dados ao montar componente
    onMounted(() => {
      store.dispatch('hortas/fetchHortas')
    })

    return {
      hortas,
      loading
    }
  }
}
</script>
```

### Exemplo B: Usando Serviço Diretamente

```vue
<template>
  <div class="associacoes-list">
    <h2>Lista de Associações</h2>

    <div v-if="loading">Carregando...</div>

    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div v-else>
      <div v-for="assoc in associacoes" :key="assoc.uuid" class="card mb-2">
        <div class="card-body">
          <h5>{{ assoc.razao_social }}</h5>
          <p>CNPJ: {{ assoc.cnpj }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import associacoesService from '@/services/associacoes.service'

export default {
  setup() {
    const associacoes = ref([])
    const loading = ref(false)
    const error = ref('')

    const loadAssociacoes = async () => {
      loading.value = true
      error.value = ''

      try {
        const response = await associacoesService.getAll()
        associacoes.value = response.data
      } catch (err) {
        error.value = 'Erro ao carregar associações'
        console.error(err)
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      loadAssociacoes()
    })

    return {
      associacoes,
      loading,
      error,
      loadAssociacoes
    }
  }
}
</script>
```

### Exemplo C: Com Filtros e Paginação

```vue
<template>
  <div>
    <!-- Filtros -->
    <div class="filters mb-3">
      <input
        v-model="filters.search"
        @input="loadCanteiros"
        placeholder="Buscar..."
      />

      <select v-model="filters.status" @change="loadCanteiros">
        <option value="">Todos</option>
        <option value="ativo">Ativos</option>
        <option value="inativo">Inativos</option>
      </select>
    </div>

    <!-- Lista -->
    <div v-if="canteiros.length > 0">
      <div v-for="canteiro in canteiros" :key="canteiro.uuid">
        {{ canteiro.nome }}
      </div>
    </div>

    <!-- Paginação -->
    <nav>
      <ul class="pagination">
        <li v-for="page in totalPages" :key="page">
          <a
            @click="changePage(page)"
            :class="{ active: page === currentPage }"
          >
            {{ page }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import canteirosService from '@/services/canteiros.service'

export default {
  setup() {
    const canteiros = ref([])
    const currentPage = ref(1)
    const totalPages = ref(1)

    const filters = reactive({
      search: '',
      status: ''
    })

    const loadCanteiros = async () => {
      try {
        const response = await canteirosService.getAll({
          page: currentPage.value,
          search: filters.search,
          status: filters.status
        })

        canteiros.value = response.data.items
        totalPages.value = response.data.totalPages
      } catch (error) {
        console.error('Erro ao carregar canteiros:', error)
      }
    }

    const changePage = page => {
      currentPage.value = page
      loadCanteiros()
    }

    onMounted(() => {
      loadCanteiros()
    })

    return {
      canteiros,
      filters,
      currentPage,
      totalPages,
      loadCanteiros,
      changePage
    }
  }
}
</script>
```

---

## 3. Criar Novo Recurso

### Exemplo: Formulário de Criação

```vue
<template>
  <div class="create-horta">
    <h2>Nova Horta</h2>

    <form @submit.prevent="handleSubmit">
      <div v-if="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>

      <div class="mb-3">
        <label>Nome da Horta</label>
        <input v-model="form.nome" type="text" class="form-control" required />
      </div>

      <div class="mb-3">
        <label>Descrição</label>
        <textarea
          v-model="form.descricao"
          class="form-control"
          rows="3"
        ></textarea>
      </div>

      <div class="mb-3">
        <label>Endereço</label>
        <input v-model="form.endereco" type="text" class="form-control" />
      </div>

      <button type="submit" class="btn btn-success" :disabled="loading">
        {{ loading ? 'Salvando...' : 'Salvar Horta' }}
      </button>

      <button
        type="button"
        class="btn btn-secondary ms-2"
        @click="router.back()"
      >
        Cancelar
      </button>
    </form>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()

    const form = reactive({
      nome: '',
      descricao: '',
      endereco: ''
    })

    const loading = ref(false)
    const errorMessage = ref('')

    const handleSubmit = async () => {
      loading.value = true
      errorMessage.value = ''

      try {
        const result = await store.dispatch('hortas/createHorta', form)

        if (result.success) {
          // Redirecionar para lista
          router.push('/hortas')
        } else {
          errorMessage.value = result.message
        }
      } catch (error) {
        errorMessage.value = 'Erro ao salvar horta'
        console.error(error)
      } finally {
        loading.value = false
      }
    }

    return {
      form,
      loading,
      errorMessage,
      handleSubmit,
      router
    }
  }
}
</script>
```

---

## 4. Atualizar Recurso

### Exemplo: Formulário de Edição

```vue
<template>
  <div class="edit-associacao">
    <h2>Editar Associação</h2>

    <div v-if="loadingData" class="text-center">
      <div class="spinner-border"></div>
    </div>

    <form v-else @submit.prevent="handleSubmit">
      <div v-if="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>

      <div class="mb-3">
        <label>Razão Social</label>
        <input
          v-model="form.razao_social"
          type="text"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label>Nome Fantasia</label>
        <input v-model="form.nome_fantasia" type="text" class="form-control" />
      </div>

      <div class="mb-3">
        <label>CNPJ</label>
        <input v-model="form.cnpj" type="text" class="form-control" required />
      </div>

      <button type="submit" class="btn btn-primary" :disabled="loading">
        {{ loading ? 'Salvando...' : 'Atualizar' }}
      </button>
    </form>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import associacoesService from '@/services/associacoes.service'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()

    const id = route.params.id

    const form = reactive({
      razao_social: '',
      nome_fantasia: '',
      cnpj: ''
    })

    const loading = ref(false)
    const loadingData = ref(false)
    const errorMessage = ref('')

    // Carregar dados existentes
    const loadAssociacao = async () => {
      loadingData.value = true

      try {
        const response = await associacoesService.getById(id)
        const data = response.data

        // Preencher formulário
        form.razao_social = data.razao_social
        form.nome_fantasia = data.nome_fantasia
        form.cnpj = data.cnpj
      } catch (error) {
        errorMessage.value = 'Erro ao carregar dados'
        console.error(error)
      } finally {
        loadingData.value = false
      }
    }

    // Atualizar dados
    const handleSubmit = async () => {
      loading.value = true
      errorMessage.value = ''

      try {
        await associacoesService.update(id, form)
        router.push('/associacoes')
      } catch (error) {
        errorMessage.value = error.response?.data?.detail || 'Erro ao atualizar'
        console.error(error)
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      loadAssociacao()
    })

    return {
      form,
      loading,
      loadingData,
      errorMessage,
      handleSubmit
    }
  }
}
</script>
```

---

## 5. Deletar Recurso

### Exemplo: Confirmação e Exclusão

```vue
<template>
  <div>
    <button @click="confirmDelete(canteiro)" class="btn btn-danger btn-sm">
      Excluir
    </button>
  </div>
</template>

<script>
import { useStore } from 'vuex'

export default {
  props: {
    canteiro: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const store = useStore()

    const confirmDelete = async item => {
      // Confirmação do usuário
      const confirmed = confirm(
        `Tem certeza que deseja excluir "${item.nome}"?`
      )

      if (!confirmed) return

      try {
        const result = await store.dispatch(
          'canteiros/deleteCanteiro',
          item.uuid
        )

        if (result.success) {
          alert('Canteiro excluído com sucesso!')
        } else {
          alert(`Erro: ${result.message}`)
        }
      } catch (error) {
        alert('Erro ao excluir canteiro')
        console.error(error)
      }
    }

    return {
      confirmDelete
    }
  }
}
</script>
```

### Exemplo: Com Modal de Confirmação

```vue
<template>
  <div>
    <button @click="showModal = true" class="btn btn-danger">Excluir</button>

    <!-- Modal de confirmação -->
    <div v-if="showModal" class="modal-overlay" @click="showModal = false">
      <div class="modal-content" @click.stop>
        <h4>Confirmar Exclusão</h4>
        <p>Tem certeza que deseja excluir esta horta?</p>

        <div class="modal-actions">
          <button
            @click="handleDelete"
            class="btn btn-danger"
            :disabled="loading"
          >
            {{ loading ? 'Excluindo...' : 'Sim, Excluir' }}
          </button>

          <button @click="showModal = false" class="btn btn-secondary">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import hortasService from '@/services/hortas.service'

export default {
  props: {
    hortaId: {
      type: String,
      required: true
    }
  },

  emits: ['deleted'],

  setup(props, { emit }) {
    const showModal = ref(false)
    const loading = ref(false)

    const handleDelete = async () => {
      loading.value = true

      try {
        await hortasService.delete(props.hortaId)
        showModal.value = false
        emit('deleted')
      } catch (error) {
        alert('Erro ao excluir horta')
        console.error(error)
      } finally {
        loading.value = false
      }
    }

    return {
      showModal,
      loading,
      handleDelete
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
}
</style>
```

---

## 6. Tratamento de Erros

### Exemplo: Tratamento Completo de Erros

```javascript
import hortasService from '@/services/hortas.service'

export default {
  setup() {
    const handleApiCall = async () => {
      try {
        const response = await hortasService.getAll()
        // Sucesso
        console.log('Dados:', response.data)
      } catch (error) {
        // Erro de resposta da API
        if (error.response) {
          const status = error.response.status
          const message = error.response.data?.detail || 'Erro na requisição'

          switch (status) {
            case 400:
              alert(`Dados inválidos: ${message}`)
              break
            case 401:
              alert('Não autorizado. Faça login novamente.')
              router.push('/login')
              break
            case 403:
              alert('Você não tem permissão para esta ação.')
              break
            case 404:
              alert('Recurso não encontrado.')
              break
            case 500:
              alert('Erro no servidor. Tente novamente mais tarde.')
              break
            default:
              alert(`Erro: ${message}`)
          }
        }
        // Erro de rede
        else if (error.request) {
          alert('Erro de conexão. Verifique se o backend está rodando.')
        }
        // Erro desconhecido
        else {
          alert('Erro desconhecido')
          console.error(error)
        }
      }
    }

    return {
      handleApiCall
    }
  }
}
```

### Exemplo: Composable para Tratamento de Erros

```javascript
// src/composables/useApiError.js
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export function useApiError() {
  const router = useRouter()
  const errorMessage = ref('')

  const handleError = error => {
    if (error.response) {
      const status = error.response.status
      const message = error.response.data?.detail || 'Erro na requisição'

      switch (status) {
        case 401:
          errorMessage.value = 'Sessão expirada. Faça login novamente.'
          router.push('/login')
          break
        case 403:
          errorMessage.value = 'Você não tem permissão para esta ação.'
          break
        case 404:
          errorMessage.value = 'Recurso não encontrado.'
          break
        case 500:
          errorMessage.value = 'Erro no servidor. Tente novamente.'
          break
        default:
          errorMessage.value = message
      }
    } else if (error.request) {
      errorMessage.value = 'Erro de conexão. Verifique sua internet.'
    } else {
      errorMessage.value = 'Erro desconhecido'
    }

    return errorMessage.value
  }

  return {
    errorMessage,
    handleError
  }
}
```

**Uso:**

```vue
<script>
import { useApiError } from '@/composables/useApiError'
import hortasService from '@/services/hortas.service'

export default {
  setup() {
    const { errorMessage, handleError } = useApiError()

    const loadHortas = async () => {
      try {
        const response = await hortasService.getAll()
        // Processar dados
      } catch (error) {
        handleError(error)
      }
    }

    return {
      errorMessage,
      loadHortas
    }
  }
}
</script>
```

---

## 🎯 Boas Práticas

### ✅ DO (Faça)

- ✅ Use `try/catch` em todas as chamadas à API
- ✅ Mostre feedback visual (loading, sucesso, erro)
- ✅ Valide dados antes de enviar
- ✅ Use Vuex para estado compartilhado
- ✅ Use composables para lógica reutilizável
- ✅ Trate diferentes status de erro apropriadamente

### ❌ DON'T (Não faça)

- ❌ Não faça requisições sem tratamento de erros
- ❌ Não ignore erros silenciosamente
- ❌ Não deixe o usuário sem feedback
- ❌ Não repita código - crie composables
- ❌ Não hardcode URLs - use variáveis de ambiente

---

**Desenvolvido por:** Felipe  
**Data:** 02/11/2025
