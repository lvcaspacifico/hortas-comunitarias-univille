# 🚀 Deploy - App Mobile Hortas Comunitárias

## 📱 Configuração para Produção

### 1. Configurar URL da API de Produção

O app está configurado para usar automaticamente a URL de produção quando **não estiver** em modo de desenvolvimento (`__DEV__` = false).

**URL de Produção (configurada):**
```
https://hortas-comunitarias-univille-production.up.railway.app/api/v1
```

**Arquivo de configuração:** [mobile/app.json](./app.json)

```json
{
  "expo": {
    "extra": {
      "apiUrl": "https://hortas-comunitarias-univille-production.up.railway.app/api/v1",
      "apiUrlDev": "http://192.168.0.22:8181/api/v1"
    }
  }
}
```

### 2. Melhorias Implementadas

#### ✅ Segurança
- ✅ Removidos todos os `console.log` com dados sensíveis (email, senha, token)
- ✅ Logs apenas em modo de desenvolvimento (`__DEV__`)
- ✅ Timeout aumentado para 60 segundos (melhor para conexões lentas)

#### ✅ Configuração
- ✅ URL da API de produção configurada automaticamente
- ✅ Fallback inteligente: localhost em DEV, produção em PROD
- ✅ Variáveis de ambiente no `app.json`

#### ✅ UX/UI
- ✅ Mensagens de erro mais amigáveis
- ✅ Tratamento robusto de diferentes formatos de resposta da API
- ✅ Remoção automática de credenciais em caso de erro

### 3. Como Testar Localmente

```bash
# 1. Instalar dependências
cd mobile
npm install

# 2. Limpar cache e iniciar
npx expo start --clear

# 3. Testar no dispositivo via Expo Go
# Escaneie o QR code com o app Expo Go
```

### 4. Como Fazer Build para Produção

#### Android (APK/AAB)

```bash
# Build APK (para distribuição direta)
npx eas build --platform android --profile preview

# Build AAB (para Google Play Store)
npx eas build --platform android --profile production
```

#### iOS (IPA)

```bash
# Build para TestFlight/App Store
npx eas build --platform ios --profile production
```

### 5. Configurar EAS (Expo Application Services)

Se ainda não configurou o EAS:

```bash
# Instalar CLI do EAS
npm install -g eas-cli

# Login no Expo
eas login

# Configurar projeto
eas build:configure
```

Criar arquivo `eas.json`:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "env": {
        "API_URL": "http://192.168.0.22:8181/api/v1"
      }
    },
    "preview": {
      "distribution": "internal",
      "env": {
        "API_URL": "https://hortas-comunitarias-univille-production.up.railway.app/api/v1"
      }
    },
    "production": {
      "env": {
        "API_URL": "https://hortas-comunitarias-univille-production.up.railway.app/api/v1"
      }
    }
  }
}
```

### 6. Credenciais da API de Produção

**Backend Railway:**
- **URL Base:** `https://hortas-comunitarias-univille-production.up.railway.app`
- **API Endpoint:** `/api/v1`
- **Banco de Dados:** MySQL (Railway)

**Credenciais fornecidas nas imagens:**
- Servidor: `centerbeam.proxy.rlwy.net:52916`
- Banco: `railway`
- Usuário: `root`
- Senha: (senha obscurecida na imagem)

### 7. Testando em Produção

#### Teste de Cadastro:
```javascript
POST https://hortas-comunitarias-univille-production.up.railway.app/api/v1/sessoes/cadastro

Body:
{
  "email": "hortas_comunitarias@univille.br",
  "senha": "senha12345"
}
```

#### Teste de Login:
```javascript
POST https://hortas-comunitarias-univille-production.up.railway.app/api/v1/sessoes/login

Body:
{
  "email": "hortas_comunitarias@univille.br",
  "senha": "senha12345"
}
```

### 8. Checklist de Deploy

- [x] Logs sensíveis removidos
- [x] URL de produção configurada
- [x] Timeout ajustado (60s)
- [x] Tratamento de erros melhorado
- [x] Variáveis de ambiente configuradas
- [ ] Build APK/AAB gerado
- [ ] Testado em produção
- [ ] Publicado na loja (Google Play/App Store)

### 9. Troubleshooting

#### Erro de Conexão
- Verificar se a API está rodando: `https://hortas-comunitarias-univille-production.up.railway.app/api/v1`
- Verificar firewall/CORS no backend
- Verificar logs do Railway

#### Token não recebido
- Verificar formato da resposta da API
- Conferir endpoint `/sessoes/login` no backend
- Validar credenciais de teste

#### App não conecta em produção
- Verificar se `__DEV__` está false no build
- Confirmar URL no `app.json`
- Testar manualmente a API via Postman/cURL

## 📚 Documentação Adicional

- [Expo EAS Build](https://docs.expo.dev/build/introduction/)
- [Expo Configuration](https://docs.expo.dev/workflow/configuration/)
- [Railway Deployment](https://docs.railway.app/)

## 🎯 Próximos Passos

1. Gerar build de produção (APK/AAB)
2. Testar em dispositivo físico
3. Publicar na Google Play Store / Apple App Store
4. Configurar analytics (opcional)
5. Configurar push notifications (opcional)
