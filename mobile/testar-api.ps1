# Script de Teste da API
# Salve como: testar-api.ps1

Write-Host "🧪 Testando Backend da API..." -ForegroundColor Cyan
Write-Host ""

# 1. Testar se API está acessível
Write-Host "1️⃣ Testando se API responde..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8181/api" -Method Get -ErrorAction Stop
    Write-Host "✅ API está respondendo!" -ForegroundColor Green
    Write-Host "Resposta: $response" -ForegroundColor Gray
} catch {
    Write-Host "❌ API NÃO está respondendo!" -ForegroundColor Red
    Write-Host "Erro: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "👉 Inicie o backend com: cd backend && docker-compose up -d" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# 2. Testar cadastro
Write-Host "2️⃣ Testando cadastro de usuário..." -ForegroundColor Yellow

$cadastroBody = @{
    associacao = @{
        cnpj = "12345678000100"
        razao_social = "Teste API"
        nome_fantasia = "Teste"
        url_ata_associacao_pdf = "https://exemplo.com/ata.pdf"
    }
    usuario = @{
        nome_completo = "Usuário de Teste"
        cpf = "12345678900"
        email = "teste.api@email.com"
        senha = "senha123"
        apelido = "Teste"
        data_de_nascimento = "1990-01-01"
    }
} | ConvertTo-Json -Depth 3

try {
    $cadastroResponse = Invoke-RestMethod `
        -Uri "http://localhost:8181/api/sessao/cadastro" `
        -Method Post `
        -Body $cadastroBody `
        -ContentType "application/json" `
        -ErrorAction Stop
    
    Write-Host "✅ Cadastro realizado com sucesso!" -ForegroundColor Green
    Write-Host "Resposta: $($cadastroResponse | ConvertTo-Json -Depth 2)" -ForegroundColor Gray
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    if ($statusCode -eq 409 -or $statusCode -eq 400) {
        Write-Host "⚠️ Usuário já existe ou dados inválidos (normal se já testou antes)" -ForegroundColor Yellow
    } else {
        Write-Host "❌ Erro no cadastro!" -ForegroundColor Red
        Write-Host "Erro: $_" -ForegroundColor Red
    }
}

Write-Host ""

# 3. Testar login
Write-Host "3️⃣ Testando login..." -ForegroundColor Yellow

$loginBody = @{
    email = "teste.api@email.com"
    senha = "senha123"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod `
        -Uri "http://localhost:8181/api/sessao/login" `
        -Method Post `
        -Body $loginBody `
        -ContentType "application/json" `
        -ErrorAction Stop
    
    Write-Host "✅ Login realizado com sucesso!" -ForegroundColor Green
    Write-Host ""
    
    # Verificar se tem token
    if ($loginResponse.token) {
        Write-Host "🎫 TOKEN ENCONTRADO:" -ForegroundColor Green
        Write-Host $loginResponse.token -ForegroundColor Cyan
        Write-Host ""
        
        # Verificar se tem usuário
        if ($loginResponse.usuario) {
            Write-Host "👤 USUÁRIO ENCONTRADO NA RESPOSTA:" -ForegroundColor Green
            Write-Host ($loginResponse.usuario | ConvertTo-Json -Depth 2) -ForegroundColor Gray
        } else {
            Write-Host "⚠️ Usuário NÃO veio na resposta (normal, app vai buscar depois)" -ForegroundColor Yellow
        }
        
        Write-Host ""
        Write-Host "✅ API ESTÁ FUNCIONANDO CORRETAMENTE!" -ForegroundColor Green
        Write-Host ""
        Write-Host "👉 Agora teste o app mobile:" -ForegroundColor Cyan
        Write-Host "   1. Abra o app" -ForegroundColor White
        Write-Host "   2. Use email: teste.api@email.com" -ForegroundColor White
        Write-Host "   3. Use senha: senha123" -ForegroundColor White
        
    } else {
        Write-Host "❌ TOKEN NÃO ENCONTRADO NA RESPOSTA!" -ForegroundColor Red
        Write-Host "Resposta completa:" -ForegroundColor Yellow
        Write-Host ($loginResponse | ConvertTo-Json -Depth 2) -ForegroundColor Gray
        Write-Host ""
        Write-Host "🐛 ESTE É O PROBLEMA!" -ForegroundColor Red
        Write-Host "O backend não está retornando o token." -ForegroundColor Red
        Write-Host "Verifique o código do backend em:" -ForegroundColor Yellow
        Write-Host "backend/src/Controllers/SessaoController.php" -ForegroundColor White
    }
    
} catch {
    Write-Host "❌ Erro no login!" -ForegroundColor Red
    Write-Host "Erro: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Possíveis causas:" -ForegroundColor Yellow
    Write-Host "- Usuário não foi cadastrado corretamente" -ForegroundColor White
    Write-Host "- Email ou senha incorretos" -ForegroundColor White
    Write-Host "- Backend não está processando login" -ForegroundColor White
}

Write-Host ""
Write-Host "🏁 Teste finalizado!" -ForegroundColor Cyan
