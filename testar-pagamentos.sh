#!/bin/bash

echo "=== TESTE DO MÓDULO DE PAGAMENTOS ==="
echo ""

# Pegar token de autenticação
echo "1. Fazendo login..."
TOKEN=$(curl -s -X POST http://localhost:8181/api/v1/sessoes/entrar \
  -H "Content-Type: application/json" \
  -d '{"login":"admin","senha":"admin123"}' | \
  python3 -c "import sys, json; print(json.load(sys.stdin)['data']['token'])" 2>/dev/null)

if [ -z "$TOKEN" ]; then
  echo "❌ Erro ao obter token"
  exit 1
fi
echo "✅ Token obtido"
echo ""

# Listar carteiristas para pegar um UUID
echo "2. Listando carteiristas..."
CARTEIRISTA_UUID=$(curl -s http://localhost:8181/api/v1/carteiristas \
  -H "Authorization: Bearer $TOKEN" | \
  python3 -c "import sys, json; data=json.load(sys.stdin); print(data['data'][0]['id'] if data.get('data') and len(data['data']) > 0 else '')" 2>/dev/null)

if [ -z "$CARTEIRISTA_UUID" ]; then
  echo "⚠️  Nenhum carteirista encontrado. Criando um..."
  CARTEIRISTA_UUID=$(curl -s -X POST http://localhost:8181/api/v1/carteiristas \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"nome":"João da Silva","telefone":"47999887766"}' | \
    python3 -c "import sys, json; print(json.load(sys.stdin)['data']['id'])" 2>/dev/null)
  echo "✅ Carteirista criado: $CARTEIRISTA_UUID"
else
  echo "✅ Carteirista encontrado: $CARTEIRISTA_UUID"
fi
echo ""

# Criar pagamento
echo "3. Criando pagamento..."
PAGAMENTO_ID=$(curl -s -X POST http://localhost:8181/api/v1/pagamentos \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"carteirista_uuid\": \"$CARTEIRISTA_UUID\",
    \"valor\": 150.00,
    \"forma_pagamento\": \"pix\",
    \"data_pagamento\": \"2024-01-15\",
    \"observacao\": \"Mensalidade Janeiro 2024\"
  }" | python3 -c "import sys, json; print(json.load(sys.stdin)['data']['id'])" 2>/dev/null)

if [ -z "$PAGAMENTO_ID" ]; then
  echo "❌ Erro ao criar pagamento"
  exit 1
fi
echo "✅ Pagamento criado: $PAGAMENTO_ID"
echo ""

# Listar pagamentos
echo "4. Listando pagamentos..."
curl -s http://localhost:8181/api/v1/pagamentos \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool
echo ""

# Buscar pagamento específico
echo "5. Buscando pagamento específico..."
curl -s http://localhost:8181/api/v1/pagamentos/$PAGAMENTO_ID \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool
echo ""

# Atualizar pagamento
echo "6. Atualizando pagamento..."
curl -s -X PUT http://localhost:8181/api/v1/pagamentos/$PAGAMENTO_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"valor\": 200.00,
    \"forma_pagamento\": \"dinheiro\",
    \"observacao\": \"Mensalidade Janeiro 2024 - Atualizado\"
  }" | python3 -m json.tool
echo ""

# Excluir pagamento
echo "7. Excluindo pagamento..."
curl -s -X DELETE http://localhost:8181/api/v1/pagamentos/$PAGAMENTO_ID \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool
echo ""

echo "=== TESTE CONCLUÍDO ==="
