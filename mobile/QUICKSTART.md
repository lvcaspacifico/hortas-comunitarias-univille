# 🚀 INÍCIO RÁPIDO - Hortas Comunitárias Mobile

Guia rápido para começar a desenvolver o app mobile do projeto.

## ⚡ Pré-requisitos

- **Node.js 16+** ([Download](https://nodejs.org/))
- **Expo CLI**: `npm install -g expo-cli`
- **Expo Go** no celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) | [iOS](https://apps.apple.com/app/expo-go/id982107779))

## 📦 Instalação

```powershell
# 1. Navegar para a pasta mobile
cd mobile

# 2. Instalar dependências
npm install

# 3. Iniciar o servidor de desenvolvimento
npm start
```

## 📱 Testar no Celular

1. Abra o **Expo Go** no seu celular
2. Escaneie o QR code que apareceu no terminal
   - **Android**: Use o próprio app Expo Go
   - **iOS**: Use a câmera do iPhone

## 🔧 Configurar API Backend

### Opção 1: Backend local no computador

Se o backend estiver rodando em `http://localhost:8181`:

1. Instale o [ngrok](https://ngrok.com/download)
2. Execute: `ngrok http 8181`
3. Copie o URL gerado (ex: `https://abc123.ngrok.io`)
4. Edite `mobile/app.json`:

```json
"extra": {
  "apiUrl": "https://abc123.ngrok.io/api"
}
```

### Opção 2: Usar IP local

```powershell
# Descobrir seu IP
ipconfig

# Procure por "Endereço IPv4" (ex: 192.168.1.10)
```

Edite `mobile/app.json`:
```json
"extra": {
  "apiUrl": "http://192.168.1.10:8181/api"
}
```

## ✅ Testar Login

Use as credenciais da sua API:
- **CPF/CNPJ**: (conforme cadastrado no backend)
- **Senha**: (conforme cadastrado no backend)

## 🏗️ Estrutura Criada

```
mobile/
├── src/
│   ├── components/common/    # ✅ Componentes reutilizáveis
│   ├── screens/              # ✅ Telas do app
│   │   ├── Auth/             # ✅ Login e Cadastro
│   │   ├── Home/             # ✅ Tela inicial
│   │   ├── Hortas/           # ✅ CRUD de Hortas
│   │   ├── Canteiros/        # ✅ CRUD de Canteiros
│   │   └── Profile/          # ✅ Perfil do usuário
│   ├── navigation/           # ✅ Rotas e navegação
│   ├── services/             # ✅ API e autenticação
│   ├── contexts/             # ✅ Estado global (Auth)
│   ├── utils/                # ✅ Validadores e formatadores
│   └── constants/            # ✅ Cores e configurações
├── App.js                    # ✅ Ponto de entrada
└── app.json                  # ✅ Configuração Expo
```

## 🎯 Funcionalidades Implementadas

### ✅ Autenticação
- Login com CPF/CNPJ e senha
- Cadastro de novos usuários
- Logout
- Persistência de sessão (JWT)

### ✅ Hortas (CRUD Completo)
- Listar todas as hortas
- Ver detalhes de uma horta
- Criar nova horta
- Editar horta existente
- Excluir horta

### ✅ Canteiros (CRUD Completo)
- Listar todos os canteiros
- Ver detalhes de um canteiro
- Criar novo canteiro
- Editar canteiro existente
- Excluir canteiro

### ✅ Perfil
- Visualizar dados do usuário
- Editar perfil

### ✅ Extras
- Validação de CPF/CNPJ
- Formatação de dados
- Loading states
- Empty states
- Refresh pull-to-refresh
- Tratamento de erros

## 🐛 Problemas Comuns

### Expo Go não consegue conectar

```powershell
# Limpar cache
expo start -c

# Ou reiniciar com tunnel
expo start --tunnel
```

### Erro de conexão com API

1. Verifique se o backend está rodando
2. Confirme o URL em `app.json`
3. Para celular físico, use ngrok ou IP local
4. Verifique se não há firewall bloqueando

### Dependências não instaladas

```powershell
# Remover node_modules e reinstalar
rm -r node_modules
npm install
```

## 📚 Próximos Passos

1. **Testar todas as funcionalidades**
   - Login/Cadastro
   - CRUD de Hortas
   - CRUD de Canteiros
   - Edição de perfil

2. **Ajustar conforme a API**
   - Verificar campos obrigatórios
   - Adaptar estrutura de dados
   - Adicionar validações específicas

3. **Expandir funcionalidades** (opcional)
   - Adicionar mais entidades (Associações, Usuários, etc.)
   - Implementar busca e filtros
   - Adicionar fotos/imagens
   - Integrar com mapas

## 💡 Dicas

- Use **Expo Go** para desenvolvimento (mais rápido)
- Teste sempre em dispositivo real
- Consulte a [documentação da API](../docs/api/README.md)
- Para produção, gere APK/IPA standalone

## 📞 Suporte

- **Documentação Backend**: `docs/api/README.md`
- **Issues**: GitHub Issues
- **React Native Docs**: https://reactnative.dev/
- **Expo Docs**: https://docs.expo.dev/

---
