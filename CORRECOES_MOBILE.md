# 🔧 CORREÇÕES APLICADAS - MOBILE

## ✅ O que foi corrigido:

### 1. URL da API no `app.json`
**Antes:**
```json
"apiUrl": "http://192.168.0.22:8181/api"
```

**Depois:**
```json
"apiUrl": "http://192.168.0.22:8181/api/v1"
```

### 2. Formato de Data de Nascimento
**Problema:** App enviava `15/05/1990` mas API espera `1990-05-15`

**Solução:** Adicionada conversão automática em `auth.service.js`:
```javascript
// Converte DD/MM/YYYY → YYYY-MM-DD
if (dataFormatada.includes('/')) {
  const [dia, mes, ano] = dataFormatada.split('/');
  dataFormatada = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
}
```

### 3. CNPJ Inválido
**Problema:** Usando `00000000000000` como fallback (inválido)

**Solução:** Trocado para `00000000000191` (CNPJ válido)

## 🚀 COMO TESTAR AGORA:

### 1. Reinicie o servidor Expo:
```powershell
# No terminal onde o Expo está rodando, pressione Ctrl+C
# Depois execute:
npx expo start --clear
```

**OU** simplesmente aperte `r` no terminal do Expo para reload

### 2. No app, use dados válidos:

#### Cadastro:
- **Nome:** Maria Silva Santos
- **Apelido:** Maria (ou deixe em branco, será o primeiro nome)
- **Email:** maria@teste.com
- **Senha:** senha123
- **CPF:** `123.456.789-09` ← **IMPORTANTE: CPF VÁLIDO!**
- **Data de Nascimento:** 15/05/1995 (será convertido automaticamente)
- **CNPJ:** Deixe vazio ou use `00.000.000/0001-91`
- **Razão Social:** Associação Maria
- **Nome Fantasia:** Associação Maria

#### Login:
- **Email:** maria.nova@email.com
- **Senha:** senha123

## ⚠️ IMPORTANTES:

### CPF VÁLIDO é OBRIGATÓRIO!
O backend valida CPF. Use apenas CPFs válidos:
- `12345678909` (123.456.789-09)
- `11144477735` (111.444.777-35)
- `22233344455` (222.333.444-55)

### CNPJ VÁLIDO é OBRIGATÓRIO!
O backend valida CNPJ. Use apenas CNPJs válidos:
- `00000000000191` (00.000.000/0001-91) ← Padrão do app
- `11222333000181` (11.222.333/0001-81)
- `12345678000195` (12.345.678/0001-95)

### Data de Nascimento:
Pode digitar no formato `DD/MM/YYYY` que será convertido automaticamente para `YYYY-MM-DD`

## ✅ Resultado Esperado:

### Após as correções:
- ✅ Não mais erro "404 Not Found"
- ✅ Cadastro funcionando
- ✅ Login funcionando
- ✅ Token recebido corretamente
- ✅ Navegação para tela principal

## 🐛 Se ainda der erro:

### 1. Limpe o cache do Expo:
```powershell
npx expo start --clear
```

### 2. Verifique se o backend está acessível:
```powershell
# No PowerShell
Invoke-RestMethod -Uri "http://192.168.0.22:8181/api/v1/sessoes/login" -Method POST -ContentType "application/json" -Body '{"email":"maria.nova@email.com","senha":"senha123"}'
```

### 3. Se der erro de conexão:
- Verifique se seu celular está na **mesma rede WiFi** que o computador
- Verifique se o firewall está permitindo conexões na porta 8181
- Teste com `localhost` se estiver usando emulador Android/iOS

**REINICIE O EXPO COM `--clear` E TESTE NOVAMENTE! 🚀**
