# 🧪 Guia de Teste - Correções de Autenticação

## ⚡ Teste Rápido (5 minutos)

### Pré-requisitos
```bash
# 1. Backend rodando
cd backend
# Verificar se API está acessível em http://localhost:8181/api

# 2. Mobile rodando
cd mobile
npx expo start
```

### ✅ Checklist de Teste

#### 1️⃣ Teste de Cadastro
- [ ] Abrir app no emulador/device
- [ ] Clicar em "Criar Conta"
- [ ] Preencher formulário:
  ```
  Nome: João da Silva
  CPF: 123.456.789-00
  E-mail: joao.silva@teste.com
  Data Nascimento: 1990-01-01
  Senha: senha123
  Confirmar Senha: senha123
  ```
- [ ] Clicar em "Cadastrar"
- [ ] **Resultado Esperado**: 
  - ✅ Mensagem "Cadastro realizado com sucesso"
  - ✅ Redirecionamento automático para Login

#### 2️⃣ Teste de Login
- [ ] Na tela de Login
- [ ] Preencher:
  ```
  E-mail: joao.silva@teste.com
  Senha: senha123
  ```
- [ ] Clicar em "Entrar"
- [ ] **Resultado Esperado**:
  - ✅ Login efetuado sem erros
  - ✅ Redirecionamento para Home
  - ⛔ **SEM** erro de AsyncStorage
  - ⛔ **SEM** tela piscando

#### 3️⃣ Teste de Persistência
- [ ] Com usuário logado
- [ ] Fechar app completamente (swipe up no multitasking)
- [ ] Reabrir o app
- [ ] **Resultado Esperado**:
  - ✅ Usuário continua logado
  - ✅ Carrega direto na Home
  - ⛔ **SEM** loop infinito

#### 4️⃣ Teste de Logout
- [ ] Ir para aba "Perfil"
- [ ] Clicar em "Sair"
- [ ] **Resultado Esperado**:
  - ✅ Redirecionamento para Login
  - ✅ Dados limpos do storage

---

## 🐛 Se Encontrar Problemas

### Erro: "Sem resposta do servidor"
```bash
# Verificar se backend está rodando
# No terminal do backend, deve ver logs das requisições
```

### Erro: "E-mail inválido"
```bash
# Usar formato correto: usuario@dominio.com
# Sem espaços, tudo minúsculo
```

### Erro: "CPF inválido"  
```bash
# Usar formato: 000.000.000-00
# Ou apenas números: 00000000000
```

### App ainda piscando
```bash
# Limpar cache do Expo
npx expo start -c

# OU limpar tudo
rm -rf node_modules
npm install
npx expo start -c
```

---

## 📊 Logs para Verificar

### No Console do Expo (Terminal):
```
✅ BOM:
POST /sessao/cadastro 200 OK
POST /sessao/login 200 OK  
GET /usuarios/me 200 OK

❌ RUIM:
Error: [AsyncStorage] Passing null/undefined...
Error: Network request failed
401 Unauthorized
```

### No LogBox do App:
```
✅ BOM:
(Sem warnings vermelhos)

❌ RUIM:
[AsyncStorage] Passing null/undefined as value...
Warning: Cannot update during render...
```

---

## 🔧 Comandos de Emergência

### Resetar completamente o app:
```bash
# 1. Parar Expo
Ctrl+C no terminal

# 2. Limpar cache
npx expo start -c

# 3. Se não resolver, reinstalar
rm -rf node_modules package-lock.json
npm install
npx expo start -c
```

### Verificar se API está acessível:
```bash
# Windows PowerShell
Invoke-RestMethod -Uri "http://localhost:8181/api" -Method Get

# OU via navegador
http://localhost:8181/api
```

---

## ✅ Critérios de Sucesso

O app está funcionando corretamente se:

1. ✅ Cadastro cria usuário e redireciona para login
2. ✅ Login funciona com e-mail e senha
3. ✅ Após login, app vai para Home
4. ✅ Fechar e reabrir mantém usuário logado
5. ✅ Logout limpa dados e volta para Login
6. ✅ **SEM** erro de AsyncStorage
7. ✅ **SEM** tela piscando
8. ✅ **SEM** loops infinitos

---

## 📞 Suporte

Se todos os testes falharem:

1. **Verificar backend**:
   ```bash
   cd backend
   # Verificar se está rodando
   docker-compose ps
   # OU se rodando localmente
   php -S localhost:8181 -t public
   ```

2. **Verificar configuração da API**:
   ```javascript
   // mobile/src/constants/config.js
   export const API_URL = 'http://SEU_IP:8181/api';
   // ⚠️ Não usar localhost se testando em device físico
   ```

3. **Verificar rede**:
   - Device e backend na mesma rede
   - Firewall liberado
   - Porta 8181 acessível

---

## 🎯 Resultado Final Esperado

```
┌─────────────────────────────────────┐
│  ✅ Cadastro: Funcionando           │
│  ✅ Login: Funcionando              │
│  ✅ Persistência: Funcionando       │
│  ✅ Logout: Funcionando             │
│  ✅ Sem erros AsyncStorage          │
│  ✅ Sem tela piscando               │
│  ✅ Sem loops infinitos             │
└─────────────────────────────────────┘
```
