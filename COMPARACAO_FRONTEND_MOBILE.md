# 📊 Comparação Frontend Web vs Mobile - Gap Analysis

## 🎯 Objetivo
Adaptar o app mobile React Native para ter as mesmas funcionalidades e visual similar ao frontend Vue.js.

---

## 1. MÓDULOS IMPLEMENTADOS

### ✅ Implementado no Mobile

| Módulo | List | Create/Edit | Detail | Status |
|--------|------|-------------|--------|--------|
| **Autenticação** | N/A | ✅ Login, Register | N/A | ✅ Completo |
| **Hortas** | ✅ | ✅ | ✅ | ✅ Completo |
| **Canteiros** | ✅ | ✅ | ✅ | ✅ Completo |
| **Perfil** | ✅ View | ✅ Edit | N/A | ✅ Completo |

### ❌ FALTANDO no Mobile (presente no frontend)

| Módulo | List | Create/Edit | Status |
|--------|------|-------------|--------|
| **Associações** | ❌ | ❌ | 🔴 NÃO IMPLEMENTADO |
| **Carteiristas** | ❌ | ❌ | 🔴 NÃO IMPLEMENTADO |
| **Pagamentos** | ❌ | ❌ | 🔴 NÃO IMPLEMENTADO |
| **Dependentes** | ❌ | ❌ | 🔴 NÃO IMPLEMENTADO |
| **Notificações** | ❌ | ❌ | 🔴 NÃO IMPLEMENTADO |

---

## 2. DESIGN SYSTEM

### 2.1 Cores

#### Frontend (Vue.js - Bootstrap 5)
```css
Verde Principal (Success): #28a745
Azul (Primary): #2563eb
Vermelho (Danger): #e74c3c
Amarelo (Warning): #ff922b
Cinza (Secondary): #95a5a6
Background: #f8f9fa
```

#### Mobile Atual
```javascript
// mobile/src/constants/colors.js
primary: '#4CAF50'        // Verde diferente!
secondary: '#2196F3'      // Azul diferente!
error: '#f44336'
warning: '#ff9800'
success: '#4CAF50'
```

#### ⚠️ Gap: Cores não correspondem exatamente

**Ação necessária:**
- [ ] Atualizar `colors.js` para usar as mesmas cores do frontend
- [ ] Verde principal: #28a745 (não #4CAF50)
- [ ] Azul: #2563eb (não #2196F3)

---

### 2.2 Tipografia

#### Frontend
```css
Font: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
H1: ~56px (display-4)
H2: 24-32px
Body: 16px
Small: 12-14px
```

#### Mobile Atual
```javascript
// Usa System Font (padrão React Native)
// Tamanhos não padronizados
```

#### ⚠️ Gap: Sem design system de tipografia

**Ação necessária:**
- [ ] Criar constantes de tipografia
- [ ] Definir tamanhos padrão (H1, H2, body, small)
- [ ] Definir pesos (normal, medium, semibold, bold)

---

### 2.3 Espaçamentos

#### Frontend (Bootstrap)
```css
1 = 4px
2 = 8px
3 = 16px
4 = 24px
5 = 48px
```

#### Mobile Atual
```javascript
// Valores hardcoded sem padrão
padding: 16  // algumas vezes
margin: 12   // outras vezes
```

#### ⚠️ Gap: Sem sistema de espaçamento consistente

**Ação necessária:**
- [ ] Criar constantes de spacing (SPACING.sm, SPACING.md, etc)
- [ ] Padronizar margens e paddings

---

### 2.4 Border Radius

#### Frontend
```css
rounded: 4px
rounded-3: 8px
rounded-4: 16px
rounded-pill: 999px
```

#### Mobile Atual
```javascript
borderRadius: 12 // Card.js
// Outros valores variados
```

#### ⚠️ Gap: Sem padrão de border radius

**Ação necessária:**
- [ ] Criar constantes BORDER_RADIUS

---

## 3. COMPONENTES BASE

### ✅ Existentes no Mobile

| Componente | Arquivo | Status |
|------------|---------|--------|
| Card | `common/Card.js` | ✅ OK |
| Button | `common/Button.js` | ✅ OK |
| Input | `common/Input.js` | ✅ OK |
| Loading | `common/Loading.js` | ✅ OK |
| EmptyState | `common/EmptyState.js` | ✅ OK |

### ❌ FALTANDO (presentes no frontend)

| Componente | Equivalente Vue | Prioridade |
|------------|-----------------|------------|
| **Badge** | Badge (Bootstrap) | 🔴 ALTA |
| **Avatar** | Avatar com iniciais | 🟡 MÉDIA |
| **Summary Cards** | CanteirosSummary, etc | 🔴 ALTA |
| **Select/Picker** | FormInput type=select | 🔴 ALTA |
| **DatePicker** | FormInput type=date | 🟡 MÉDIA |
| **Checkbox/Switch** | FormInput type=checkbox | 🟡 MÉDIA |
| **Alert/Toast** | Alert (Bootstrap) | 🟡 MÉDIA |

---

## 4. TELAS/FUNCIONALIDADES

### 4.1 Home/Dashboard

#### Frontend
- Grid 2x4 de cards (7 módulos)
- Cada card: Emoji + Título + Descrição + Botão
- Cards: Associações, Hortas, Canteiros, Carteiristas, Pagamentos, Dependentes, Notificações

#### Mobile Atual
- Lista vertical de cards
- Apenas: Hortas, Canteiros, Perfil

#### ⚠️ Gap: Faltam 4 módulos no Home

**Ação necessária:**
- [ ] Adicionar cards de: Pagamentos, Dependentes, Notificações, Associações (?)
- [ ] Adaptar layout para grid ou scroll horizontal

---

### 4.2 Login

#### Frontend
- Split screen (50% verde / 50% form)
- Toggle Canteirista/Administrador
- Logo circular com ícone folha
- Botões grandes (56px altura)
- Link "Esqueceu sua senha?"

#### Mobile Atual
- Full screen simples
- Sem toggle de tipo de usuário
- Botão padrão
- Sem "Esqueceu senha"

#### ⚠️ Gap: Layout e features diferentes

**Ação necessária:**
- [ ] Adicionar toggle Canteirista/Admin (visual)
- [ ] Adicionar "Esqueceu senha" (se backend suportar)
- [ ] Melhorar visual do botão (altura, estilo)

---

### 4.3 Módulos Faltantes

#### 🔴 PAGAMENTOS

**Frontend:**
- List: Cards de resumo (Total Pago, Total de Pagamentos)
- Tabela: Carteirista, Telefone, Valor (BRL), Forma (PIX/Dinheiro), Data, Ações
- Create: Form com Carteirista, Valor, Forma, Data, Observação
- Badges customizados para forma de pagamento

**Mobile:**
- ❌ Não implementado

**Prioridade:** 🔴 **ALTA** (módulo chave do sistema)

**Tarefas:**
- [ ] Criar `mobile/src/services/pagamentos.service.js`
- [ ] Criar `mobile/src/screens/Pagamentos/PagamentosListScreen.js`
- [ ] Criar `mobile/src/screens/Pagamentos/PagamentoFormScreen.js`
- [ ] Criar componente `PaymentsSummary` (cards de resumo)
- [ ] Criar componente `PaymentItem` (card individual)
- [ ] Adicionar navegação (stack navigator)

---

#### 🔴 DEPENDENTES

**Frontend:**
- List: Cards de resumo (Total, Ativos, Menores de Idade)
- Cards individuais com Avatar, Nome, CPF, Idade, Parentesco, Status
- Create: Nome, CPF (máscara), Idade, Carteirista, Ativo (checkbox)
- Busca por Carteirista

**Mobile:**
- ❌ Não implementado

**Prioridade:** 🔴 **ALTA**

**Tarefas:**
- [ ] Criar `mobile/src/services/dependentes.service.js`
- [ ] Criar `mobile/src/screens/Dependentes/DependentesListScreen.js`
- [ ] Criar `mobile/src/screens/Dependentes/DependenteFormScreen.js`
- [ ] Criar componente `DependentesSummary`
- [ ] Criar componente `DependenteItem` com avatar
- [ ] Implementar máscarade CPF
- [ ] Checkbox/Switch component

---

#### 🟡 NOTIFICAÇÕES

**Frontend:**
- **Duas views diferentes:**
  - **Canteirista:** Cards de resumo + Lista de notificações
  - **Admin:** Tabela completa + Botão "Nova Notificação"
- Create: Tipo, Título, Mensagem, Campos condicionais, Prioridade, Status
- Cards com ícones coloridos por tipo
- Badge de prioridade
- Marcar como lida

**Mobile:**
- ❌ Não implementado

**Prioridade:** 🟡 **MÉDIA** (nice to have)

**Tarefas:**
- [ ] Criar `mobile/src/services/notificacoes.service.js`
- [ ] Criar `mobile/src/screens/Notificacoes/NotificacoesListScreen.js`
- [ ] Criar `mobile/src/screens/Notificacoes/NotificacaoFormScreen.js`
- [ ] Criar componente `NotificacoesSummary`
- [ ] Criar componente `NotificacaoItem`
- [ ] Implementar lógica condicional (Canteirista vs Admin)
- [ ] Ícones por tipo de notificação
- [ ] Badge de prioridade

---

#### 🟢 ASSOCIAÇÕES (opcional)

**Frontend:**
- List: Tabela com Nome, Email, Telefone, Ações
- Create: Nome, Descrição, Endereço, Telefone (máscara), Email

**Mobile:**
- ❌ Não implementado

**Prioridade:** 🟢 **BAIXA** (Admin feature, pode não ser necessário em mobile)

**Tarefas:**
- [ ] Avaliar se é necessário no mobile
- [ ] Se sim, criar telas similares a Hortas

---

#### 🟢 CARTEIRISTAS (opcional)

**Frontend:**
- List: Tabela com Nome, Telefone, Ações
- Create: Nome, Telefone (máscara)

**Mobile:**
- ❌ Não implementado

**Prioridade:** 🟢 **BAIXA** (usado em Dependentes e Pagamentos, mas pode ser selecionado via API)

**Tarefas:**
- [ ] Avaliar se é necessário CRUD no mobile
- [ ] Implementar service para buscar carteiristas (para selects)

---

## 5. NAVEGAÇÃO

### Frontend (Vue Router)
```
/
/login
/associacoes, /associacoes/criar, /associacoes/:id/editar
/hortas, /hortas/criar, /hortas/:id/editar
/canteiros, /canteiros/criar, /canteiros/:id/editar
/carteiristas, /carteiristas/criar, /carteiristas/:id/editar
/pagamentos, /pagamentos/criar, /pagamentos/:id/editar
/dependentes, /dependentes/criar, /dependentes/:id/editar
/notificacoes, /notificacoes/criar, /notificacoes/:id/editar
```

### Mobile Atual (React Navigation)
```
Auth Stack:
  - Login
  - Register

Main Tabs:
  - Home
  - Hortas Stack (List, Detail, Form)
  - Canteiros Stack (List, Detail, Form)
  - Profile Stack (Profile, EditProfile)
```

#### ⚠️ Gap: Faltam stacks de navegação

**Ação necessária:**
- [ ] Adicionar tab de Pagamentos
- [ ] Adicionar tab de Dependentes
- [ ] Adicionar tab de Notificações (ou incluir no Home)
- [ ] Considerar se Associações/Carteiristas precisam de tabs

---

## 6. VALIDAÇÕES E MÁSCARAS

### Frontend
- Telefone: `(00) 00000-0000` com validação DDD + celular
- CPF: `000.000.000-00` com validação dígitos
- Email: regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Valores monetários: `R$ 0,00`

### Mobile Atual
- CPF/CNPJ: validação via `validators.js`
- Email: validação regex
- ❌ Sem máscaras visuais

#### ⚠️ Gap: Máscaras de input não implementadas

**Ação necessária:**
- [ ] Instalar `react-native-mask-input` ou similar
- [ ] Implementar máscara de telefone
- [ ] Implementar máscara de CPF
- [ ] Implementar máscara de moeda (opcional)

---

## 7. FORMATAÇÃO DE DADOS

### Frontend
- Moeda: `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`
- Data: `toLocaleDateString('pt-BR')`
- Telefone: formatação customizada

### Mobile Atual
- Moeda: `formatters.js` (básico)
- Data: `formatters.js` (básico)
- ✅ Já tem base

#### ✅ Gap: Pequeno, melhorar formatação existente

**Ação necessária:**
- [ ] Adicionar formatação de moeda BRL (R$)
- [ ] Padronizar formatação de data

---

## 8. ÍCONES

### Frontend
- **Bootstrap Icons:** bi-currency-dollar, bi-calendar-event, bi-graph-up
- **Font Awesome:** fa-leaf, fa-tools, fa-exclamation-circle, fa-calendar
- **Emojis:** 🌱, 🏢, 🌳, 📦, 👥, 💳, 🧑‍🌾, 🔔, 📍, ✏️, 🗑️

### Mobile Atual
- **Ionicons** (do Expo): checkmark, close, etc.
- ❌ Sem emojis ou ícones específicos do frontend

#### ⚠️ Gap: Biblioteca e ícones diferentes

**Ação necessária:**
- [ ] Considerar adicionar `@expo/vector-icons` com FontAwesome
- [ ] Ou mapear Ionicons equivalentes
- [ ] Usar emojis para match visual com frontend

---

## 9. RESUMO DE GAPS

### 🔴 Críticos (Bloqueadores)

1. **Módulo Pagamentos** - CRUD completo faltando
2. **Módulo Dependentes** - CRUD completo faltando
3. **Componente Badge** - Usado em vários lugares
4. **Componente Select/Picker** - Formulários dependem disso
5. **Summary Cards** - Layout do frontend depende disso
6. **Cores do design system** - Não match com frontend

### 🟡 Importantes (Devem ser feitos)

7. **Módulo Notificações** - Feature chave
8. **Máscaras de input** - UX importante
9. **Tipografia padronizada** - Consistência visual
10. **Espaçamentos padronizados** - Layout consistente
11. **Toggle Canteirista/Admin** no login - UX do frontend
12. **DatePicker** - Formulários de data

### 🟢 Nice to Have (Opcionais)

13. **Módulo Associações** - Admin feature
14. **Módulo Carteiristas** - Pode ser integrado via select
15. **Avatar component** - Visual melhor
16. **Toast/Alert** - Feedback melhor que alert()

---

## 10. PLANO DE AÇÃO - ROADMAP

### Fase 1: Design System (1-2 dias)
- [ ] Atualizar `colors.js` com cores exatas do frontend
- [ ] Criar `typography.js` com tamanhos e pesos padrão
- [ ] Criar `spacing.js` com sistema de espaçamento
- [ ] Criar `borderRadius.js` (ou adicionar em theme)

### Fase 2: Componentes Base (2-3 dias)
- [ ] Criar componente **Badge**
- [ ] Criar componente **Select** (Picker)
- [ ] Criar componente **DatePicker**
- [ ] Criar componente **Avatar** com iniciais
- [ ] Criar componente **Checkbox/Switch**
- [ ] Criar componente **SummaryCard** (base para resumos)

### Fase 3: Módulo Pagamentos (3-4 dias)
- [ ] Service de pagamentos
- [ ] PagamentosListScreen com resumo
- [ ] PagamentoFormScreen
- [ ] PaymentsSummary component
- [ ] PaymentItem component
- [ ] Navegação (tab + stack)
- [ ] Integração com API

### Fase 4: Módulo Dependentes (3-4 dias)
- [ ] Service de dependentes
- [ ] DependentesListScreen com resumo
- [ ] DependenteFormScreen
- [ ] DependentesSummary component
- [ ] DependenteItem component com avatar
- [ ] Máscara de CPF
- [ ] Navegação

### Fase 5: Módulo Notificações (2-3 dias)
- [ ] Service de notificações
- [ ] NotificacoesListScreen (dupla view)
- [ ] NotificacaoFormScreen
- [ ] NotificacoesSummary component
- [ ] NotificacaoItem component
- [ ] Lógica condicional Canteirista/Admin
- [ ] Navegação

### Fase 6: Melhorias e Ajustes (2-3 dias)
- [ ] Atualizar HomeScreen com todos os módulos
- [ ] Implementar máscaras de input
- [ ] Melhorar formatação de dados
- [ ] Adicionar "Esqueceu senha" no login
- [ ] Ajustar estilos para match com frontend
- [ ] Testes de integração

### Fase 7: Testes e Deploy (1-2 dias)
- [ ] Testar todos os fluxos
- [ ] Testar com API de produção
- [ ] Build APK/AAB
- [ ] Documentação final

---

## 11. ESTIMATIVA TOTAL

**Tempo total estimado:** 14-21 dias úteis (2.5 - 4 semanas)

**Prioridade sugerida:**
1. ✅ Fase 1 (Design System) - Base para tudo
2. ✅ Fase 2 (Componentes) - Reutilizáveis
3. 🔴 Fase 3 (Pagamentos) - Feature chave
4. 🔴 Fase 4 (Dependentes) - Feature chave
5. 🟡 Fase 5 (Notificações) - Nice to have
6. ✅ Fase 6 (Melhorias) - Polish
7. ✅ Fase 7 (Testes/Deploy) - Final

---

## 12. DECISÕES NECESSÁRIAS

### Perguntas para o time:

1. **Módulo Associações** - Implementar no mobile ou só web?
2. **Módulo Carteiristas** - CRUD completo ou só seleção via API?
3. **Notificações Push** - Implementar push notifications nativas?
4. **Offline Mode** - Necessário suporte offline?
5. **Prioridade** - Qual módulo é mais urgente? (Pagamentos ou Dependentes?)
6. **Login Toggle** - Realmente precisa do toggle Canteirista/Admin?

---

**Próximo passo:** Começar pela Fase 1 (Design System) para garantir consistência visual.
