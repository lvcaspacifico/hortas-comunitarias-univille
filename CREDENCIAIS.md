# CREDENCIAIS DE ACESSO - SISTEMA HORTAS COMUNITÁRIAS

## 🔐 ADMINISTRADOR

- **Email:** admin@admin.com
- **Senha:** admin123
- **Cargo:** Administração da Plataforma
- **UUID:** e56f98ff-b6df-11f0-bc8f-ea87c263dbd8

## 👨‍🌾 CANTEIRISTAS

### Canteirista 1

- **Email:** canteirista_1@example.com
- **Senha:** (verificar no banco)
- **Nome:** Pedro Canteiro SP
- **UUID:** f09ccd30-b6df-11f0-bc8f-ea87c263dbd8

### Canteirista 2

- **Email:** canteirista_2@example.com
- **Senha:** (verificar no banco)
- **Nome:** Julia Canteiro RJ
- **UUID:** f09cf456-b6df-11f0-bc8f-ea87c263dbd8

## 📝 COMO LOGAR

### Frontend

URL: http://localhost:3001

### Passos:

1. Acesse http://localhost:3001
2. Você será redirecionado para a tela de login
3. Selecione o tipo de usuário (Canteirista ou Administrador)
4. Digite o email e senha
5. Clique em "Entrar como Administrador" ou "Entrar como Canteirista"

### API Direta (teste)

```bash
curl -X POST http://localhost:8181/api/v1/sessoes/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@admin.com","senha":"admin123"}'
```

## ✅ STATUS DA IMPLEMENTAÇÃO

### Backend ✅

- [x] Endpoint `/api/v1/sessoes/login` funcionando
- [x] Autenticação via JWT
- [x] Validação de email e senha
- [x] Cargos: Administrador e Canteirista configurados no banco

### Frontend ✅

- [x] Tela de login com toggle Canteirista/Administrador
- [x] Formulário de login funcional
- [x] Validação de campos
- [x] Integração com API de login
- [x] Armazenamento de token no localStorage
- [x] Redirecionamento após login bem-sucedido

### Banco de Dados ✅

- [x] Tabela `usuarios` com campos necessários
- [x] Tabela `cargos` com tipos: Canteirista, Administrador da Plataforma, Administrador da Associação, Administrador da Horta
- [x] Usuários de teste cadastrados
- [x] Senhas hasheadas com bcrypt

## 🔧 OBSERVAÇÕES TÉCNICAS

1. O sistema **NÃO** diferencia canteirista de administrador no login - ambos usam o mesmo endpoint
2. A diferenciação é feita pelo campo `cargo_uuid` na tabela `usuarios`
3. O token JWT contém: usuario_uuid, cargo_uuid, associacao_uuid, horta_uuid
4. O frontend apenas mostra UI diferente (botão azul ou verde) mas envia mesma requisição
5. **TODO:** Implementar lógica de permissões baseada no cargo após o login

## 📊 CARGOS DISPONÍVEIS NO BANCO

| UUID                                 | Nome do Cargo               |
| ------------------------------------ | --------------------------- |
| e56961a5-b6df-11f0-bc8f-ea87c263dbd8 | Canteirista                 |
| e56961b0-b6df-11f0-bc8f-ea87c263dbd8 | Administração da Plataforma |
| e56961b8-b6df-11f0-bc8f-ea87c263dbd8 | Administração da Associação |
| e56961c0-b6df-11f0-bc8f-ea87c263dbd8 | Administração da Horta      |
| e5696151-b6df-11f0-bc8f-ea87c263dbd8 | Dependente                  |

---

**Última atualização:** 02/11/2025
