# 🔧 Troubleshooting - Instalação de Dependências

## ❌ Problema: Erro de Rede ao Instalar Picker

### Erro Encontrado
```
npm error code ECONNRESET
npm error network request to https://registry.npmjs.org/@react-native-picker%2fpicker failed
```

### ✅ Soluções (em ordem de preferência)

#### Solução 1: Tentar Novamente (problema temporário de rede)
```bash
cd mobile
npm install @react-native-picker/picker@2.9.0 --legacy-peer-deps
```

#### Solução 2: Limpar Cache do NPM
```bash
cd mobile
npm cache clean --force
npm install @react-native-picker/picker@2.9.0 --legacy-peer-deps
```

#### Solução 3: Usar Yarn (alternativa ao npm)
```bash
cd mobile

# Instalar Yarn (se não tiver)
npm install -g yarn

# Instalar com Yarn
yarn add @react-native-picker/picker@2.9.0
```

#### Solução 4: Adicionar Manualmente ao package.json
1. Abra `mobile/package.json`
2. Adicione na seção `dependencies`:
```json
{
  "dependencies": {
    "@react-native-picker/picker": "2.9.0",
    ...outras dependências
  }
}
```
3. Execute:
```bash
cd mobile
npm install --legacy-peer-deps
```

#### Solução 5: Usar Proxy/VPN (se firewall estiver bloqueando)
```bash
# Se estiver atrás de um proxy corporativo
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080

# Depois tente instalar novamente
cd mobile
npm install @react-native-picker/picker@2.9.0 --legacy-peer-deps
```

---

## ⚠️ Warnings de ESLint - PODE IGNORAR

Os warnings abaixo são **normais** e **não afetam** o funcionamento do app:

```
npm warn ERESOLVE overriding peer dependency
npm warn While resolving: eslint-plugin-react-hooks@4.6.2
npm warn Found: eslint@9.38.0
npm warn Conflicting peer dependency: eslint@8.57.1
```

**Por quê?**
- São apenas incompatibilidades de versão entre ESLint 9 e plugins antigos
- ESLint é usado apenas em **desenvolvimento** (linting)
- **Não afeta** o runtime do app
- **Não afeta** o build de produção

**Solução (opcional)**:
Se quiser eliminar os warnings, pode downgrade do ESLint:
```bash
cd mobile
npm install eslint@8.57.1 --save-dev --legacy-peer-deps
```

Mas **não é necessário** para o app funcionar.

---

## ✅ Verificar se Instalou Corretamente

```bash
cd mobile

# Verificar se o pacote está instalado
npm list @react-native-picker/picker

# Deve mostrar algo como:
# @react-native-picker/picker@2.9.0
```

Se mostrar **"(empty)"**, a instalação falhou e precisa tentar novamente.

---

## 🚀 Alternativa: Usar Select Nativo (se Picker não instalar)

Se **nenhuma solução acima funcionar**, você pode temporariamente usar um componente nativo do React Native:

### Substituir Picker por Select Simples (temporário)

Edite `mobile/src/screens/Pagamentos/PagamentoFormScreen.js`:

**De:**
```javascript
import { Picker } from '@react-native-picker/picker';

<Picker
  selectedValue={formData.carteirista_id}
  onValueChange={(value) => setFormData({ ...formData, carteirista_id: value })}
>
  <Picker.Item label="Selecione..." value="" />
  {carteiristas.map((c) => (
    <Picker.Item key={c.id} label={c.nome} value={c.id.toString()} />
  ))}
</Picker>
```

**Para:**
```javascript
import { Modal, FlatList, TouchableOpacity } from 'react-native';

// Criar dropdown manual (mais trabalhoso, mas funciona)
// Ver exemplo completo em mobile/PICKER_ALTERNATIVE.md
```

Mas **recomendo fortemente** tentar as soluções 1-4 primeiro, pois o Picker é muito mais simples.

---

## 📞 Suporte Adicional

Se nenhuma solução funcionar:

1. **Verificar conexão de internet**:
   ```bash
   ping registry.npmjs.org
   ```

2. **Verificar se npm está atualizado**:
   ```bash
   npm --version  # deve ser >= 8.0.0
   npm install -g npm@latest
   ```

3. **Deletar node_modules e reinstalar tudo**:
   ```bash
   cd mobile
   rm -rf node_modules package-lock.json
   npm install --legacy-peer-deps
   npm install @react-native-picker/picker@2.9.0 --legacy-peer-deps
   ```

4. **Última opção - Usar versão anterior do Expo**:
   Se absolutamente nada funcionar, pode temporariamente comentar o uso do Picker e testar o resto do app.

---

## ✅ Quando Considerar Instalação Bem-Sucedida

1. `npm list @react-native-picker/picker` mostra a versão
2. `npx expo start` não dá erro de módulo não encontrado
3. O app inicia sem crashes

---

**Boa sorte!** 🍀
