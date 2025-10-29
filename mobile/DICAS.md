# 💡 Dicas e Comandos Úteis - Hortas Mobile

## 🚀 Comandos Principais

### Desenvolvimento
```bash
# Iniciar app
npm start

# Iniciar com cache limpo
npm start -- --clear

# Iniciar em modo tunnel (para redes complexas)
npm start -- --tunnel

# Abrir no Android
npm run android

# Abrir no iOS (apenas macOS)
npm run ios
```

### Instalação e Limpeza
```bash
# Instalar dependências
npm install

# Limpar node_modules e reinstalar
rm -r node_modules; npm install

# Ou no Windows PowerShell:
Remove-Item -Recurse -Force node_modules; npm install

# Atualizar Expo CLI
npm install -g expo-cli@latest
```

### Debugging
```bash
# Abrir React DevTools
npm start
# Pressione 'd' no terminal

# Ver logs do dispositivo
# No terminal do Expo, pressione 'l'

# Recarregar app
# Sacudir o celular ou pressione 'r' no terminal
```

## 📱 Testando no Dispositivo

### Android
1. Instale Expo Go: https://play.google.com/store/apps/details?id=host.exp.exponent
2. Conecte ao mesmo WiFi do PC
3. Abra Expo Go
4. Escaneie o QR code

### iOS
1. Instale Expo Go: https://apps.apple.com/app/expo-go/id982107779
2. Conecte ao mesmo WiFi do PC
3. Abra a Câmera
4. Escaneie o QR code

## 🔧 Configuração da API

### Usando ngrok (Recomendado)
```bash
# 1. Instalar ngrok
npm install -g ngrok

# 2. Expor porta do backend
ngrok http 8181

# 3. Copiar URL (exemplo: https://abc123.ngrok.io)

# 4. Editar mobile/app.json:
"extra": {
  "apiUrl": "https://abc123.ngrok.io/api"
}

# 5. Reiniciar app
npm start -- --clear
```

### Usando IP Local
```bash
# Windows: Descobrir IP
ipconfig
# Procure "Endereço IPv4"

# Editar mobile/app.json:
"extra": {
  "apiUrl": "http://192.168.1.10:8181/api"
}
```

## 🐛 Solucionando Problemas

### App não conecta com API

**Problema**: Erro de conexão ou timeout

**Soluções**:
1. Verifique se o backend está rodando: `http://localhost:8181/api`
2. Confirme o URL em `app.json`
3. Use ngrok ou IP local para testes no celular
4. Verifique firewall do Windows

### Expo Go não encontra o servidor

**Problema**: QR code não funciona

**Soluções**:
```bash
# Limpar cache
npm start -- --clear

# Usar tunnel
npm start -- --tunnel

# Verificar se estão na mesma rede WiFi
```

### Erro: Unable to resolve module

**Problema**: Dependência não encontrada

**Solução**:
```bash
# Reinstalar dependências
rm -r node_modules
npm install

# Limpar cache do Metro
npm start -- --reset-cache
```

### AsyncStorage deprecated warning

**Problema**: Warning sobre AsyncStorage

**Já corrigido**: Estamos usando `@react-native-async-storage/async-storage`

### Erro de build ou eject

**Problema**: Tentou fazer build mas deu erro

**Solução**: Para MVP, não precisa de build! Use Expo Go.

## 📝 Checklist de Testes

### ✅ Autenticação
- [ ] Login com credenciais válidas
- [ ] Login com credenciais inválidas (mostra erro?)
- [ ] Cadastro de novo usuário
- [ ] Validação de CPF/CNPJ
- [ ] Logout funciona
- [ ] Sessão persiste após fechar app

### ✅ Hortas
- [ ] Listar hortas
- [ ] Ver detalhes de uma horta
- [ ] Criar nova horta
- [ ] Editar horta
- [ ] Excluir horta
- [ ] Pull to refresh

### ✅ Canteiros
- [ ] Listar canteiros
- [ ] Ver detalhes de um canteiro
- [ ] Criar novo canteiro
- [ ] Editar canteiro
- [ ] Excluir canteiro
- [ ] Pull to refresh

### ✅ Perfil
- [ ] Ver dados do perfil
- [ ] Editar perfil
- [ ] Alterações são salvas

### ✅ Navegação
- [ ] Todas as tabs funcionam
- [ ] Voltar funciona corretamente
- [ ] Navegação entre telas é fluida

### ✅ UX
- [ ] Loading aparece ao carregar dados
- [ ] Mensagens de erro são claras
- [ ] Empty states aparecem quando não há dados
- [ ] Botões têm feedback visual

## 🎨 Personalizando o App

### Alterar cores
Edite `src/constants/colors.js`:
```javascript
export const COLORS = {
  primary: '#4CAF50',  // Verde principal
  secondary: '#FFC107', // Amarelo secundário
  // ...
};
```

### Alterar nome do app
Edite `app.json`:
```json
{
  "expo": {
    "name": "Seu Nome Aqui",
    "slug": "seu-slug-aqui"
  }
}
```

### Adicionar novo módulo (entidade)

1. Criar service em `src/services/`:
```javascript
// src/services/associacoes.service.js
import api from './api';

export const getAssociacoes = async () => {
  const response = await api.get('/associacoes');
  return response.data;
};
// ... outros métodos
```

2. Criar telas em `src/screens/Associacoes/`:
- `AssociacoesListScreen.js`
- `AssociacaoDetailScreen.js`
- `AssociacaoFormScreen.js`

3. Criar navegação em `src/navigation/`:
- `AssociacoesStackNavigator.js`

4. Adicionar tab em `MainTabNavigator.js`

## 📦 Build para Produção (Futuro)

```bash
# Android APK
expo build:android -t apk

# Android AAB (Google Play)
expo build:android -t app-bundle

# iOS (requer conta Apple Developer)
expo build:ios
```

## 🔐 Segurança

- ✅ JWT tokens são armazenados com segurança (AsyncStorage)
- ✅ Senhas nunca são armazenadas
- ✅ Comunicação com HTTPS (em produção)
- ✅ Validações client-side E server-side

## 📚 Recursos Úteis

### Documentação
- React Native: https://reactnative.dev/
- Expo: https://docs.expo.dev/
- React Navigation: https://reactnavigation.org/
- Axios: https://axios-http.com/

### Componentes Úteis
- Ionicons (ícones): https://ionic.io/ionicons
- React Native Paper (UI): https://callstack.github.io/react-native-paper/
- React Native Elements: https://reactnativeelements.com/

### Ferramentas
- Expo Snack (testar online): https://snack.expo.dev/
- React DevTools: `npm install -g react-devtools`

## 💡 Dicas de Desenvolvimento

1. **Sempre teste no dispositivo real** - Emuladores podem ter comportamento diferente
2. **Use hot reload** - Economiza muito tempo
3. **Console.log é seu amigo** - Para debug rápido
4. **Teste com dados vazios** - Empty states são importantes
5. **Valide no cliente E servidor** - Dupla segurança
6. **Siga o padrão do projeto** - Mantém código consistente

## 🚀 Workflow Recomendado

```bash
# 1. Abrir terminal
cd mobile

# 2. Iniciar backend (outro terminal)
cd ../
docker-compose up -d

# 3. Verificar backend
# Abrir http://localhost:8181/api no navegador

# 4. Iniciar app mobile
npm start

# 5. Escanear QR code no celular

# 6. Desenvolver e testar
# Salvar arquivo = hot reload automático

# 7. Git commit quando terminar
git add .
git commit -m "feat: adiciona funcionalidade X"
git push
```

## 📞 Ajuda

Se tiver problemas:
1. Consulte este documento
2. Leia o README.md
3. Veja o QUICKSTART.md
4. Pesquise no Google/Stack Overflow
5. Pergunte à equipe

---

**Dica Final**: O app está funcional e bem estruturado. Não tenha medo de explorar o código e fazer modificações! 🚀
