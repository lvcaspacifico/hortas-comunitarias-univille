# ⚡ GUIA RÁPIDO - 5 MINUTOS ANTES DA APRESENTAÇÃO

## 🚀 COMANDOS ESSENCIAIS

### 1. Iniciar Backend (30 segundos)
```powershell
docker-compose up -d mysql php nginx
```
⏱️ **Aguarde 30 segundos** para MySQL inicializar

### 2. Iniciar Mobile (10 segundos)
```powershell
cd mobile
npx expo start
```
📱 **Escaneie QR code** com Expo Go no celular

### 3. Testar API (5 segundos)
```powershell
Invoke-WebRequest http://localhost:8181/api/v1 -UseBasicParsing
```
✅ Se retornar 200 OK = **TUDO CERTO!**

---

## 🎬 ROTEIRO DA DEMO (15 MIN)

1. **LOGIN** (2 min)
   - Email: `admin@admin.com`
   - Senha: `admin123`
   - Mostrar token sendo salvo

2. **NAVEGAÇÃO** (2 min)
   - Home → Hortas → Canteiros → Perfil
   - Mostrar transições suaves

3. **HORTAS** (5 min)
   - Listar hortas
   - Criar nova: "Horta Central"
   - Ver detalhes
   - Editar nome
   - ⚠️ **NÃO EXCLUIR!**

4. **CANTEIROS** (3 min)
   - Listar canteiros
   - Criar novo: "Canteiro Tomates"
   - Associar a horta

5. **PERFIL** (2 min)
   - Ver dados
   - Logout

6. **CÓDIGO** (1 min)
   - Mostrar estrutura `src/`
   - Destacar `services/api.js`

---

## 🔑 CREDENCIAIS

**Admin**: `admin@admin.com` / `admin123`

---

## ⚠️ SE DER PROBLEMA

### API não responde?
```powershell
docker-compose restart php nginx
```

### Mobile não conecta?
```powershell
npx expo start --tunnel
```

### Token inválido?
- Logout → Login novamente

---

## 💡 FRASES-CHAVE

- "Integração **real** com backend"
- "Todas operações **CRUD funcionam**"
- "**Persistência** de sessão com JWT"
- "Interface **intuitiva e moderna**"
- "Código **bem estruturado**"

---

## ✅ CHECKLIST FINAL

- [ ] Backend rodando (http://localhost:8181)
- [ ] App no celular conectado
- [ ] Login testado
- [ ] Celular carregado
- [ ] WiFi estável
- [ ] **CALMA E CONFIANÇA!** 😊

---

**🎯 VOCÊ CONSEGUE! 🚀**
