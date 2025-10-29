## ✅ Solução Simples:

### **Opção 1: Usando o Explorador de Arquivos**

1. Abra o Explorador de Arquivos
2. Navegue até: `C:\USEU-DIRETÓRIO\hortas-comunitarias-univille\mobile`
3. **Clique duas vezes** no arquivo **`iniciar.bat`** 
4. Uma janela vai abrir e mostrar o QR code! 📱

### **Opção 2: Terminal VS Code**

Execute estes comandos **um por um**:

```powershell
cd "C:\USEU-DIRETÓRIO\hortas-comunitarias-univille\mobile"
$env:Path = "C:\Program Files\nodejs;" + $env:Path
npm start
```

---

## 📱 Depois que o QR Code aparecer use o SDK 52, pois o 54 está dando problema:

1. **Abra o Expo Go** Android: https://expo.dev/go?sdkVersion=52&platform=android&device=true OU iOS: https://expo.dev/go?sdkVersion=52&platform=ios&device=true
2. **Escaneie o QR code** que aparece no terminal
3. **Aguarde** o app carregar (pode demorar 2-3 minutos na primeira vez)
4. Teste...

---

## 🔥 Próximo passo: Configurar a API

Depois que o app abrir no celular, você vai precisar configurar a conexão com a API do backend:

1. Inicie o backend: `docker-compose up -d`
2. Instale o ngrok: `npm install -g ngrok`
3. Exponha a API: `ngrok http 8181`
4. Copie a URL gerada (exemplo: `https://abc123.ngrok.io`)
5. Edite o arquivo app.json e substitua o `apiUrl`
