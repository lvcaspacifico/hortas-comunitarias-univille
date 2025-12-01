# Script de teste do backend
Write-Host "🧪 TESTANDO BACKEND DA API" -ForegroundColor Cyan
Write-Host ""

# Teste 1: Login
Write-Host "1️⃣ Testando LOGIN..." -ForegroundColor Yellow
try {
    $loginBody = @{
        email = "maria.nova@email.com"
        senha = "senha123"
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "http://localhost:8181/api/v1/sessoes/login" `
        -Method POST `
        -ContentType "application/json" `
        -Body $loginBody `
        -ErrorAction Stop
    
    Write-Host "✅ LOGIN FUNCIONOU!" -ForegroundColor Green
    Write-Host "Token recebido: $($response.token)" -ForegroundColor Green
    Write-Host ""
    
    $token = $response.token
} catch {
    Write-Host "❌ ERRO NO LOGIN: $_" -ForegroundColor Red
    Write-Host "Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
    Write-Host ""
}

# Teste 2: Cadastro
Write-Host "2️⃣ Testando CADASTRO..." -ForegroundColor Yellow
try {
    $cadastroBody = @{
        associacao = @{
            cnpj = "12345678000195"  # CNPJ válido diferente
            razao_social = "Nova Associação Teste Ltda"
            nome_fantasia = "Nova Associação Teste"
        }
        usuario = @{
            nome_completo = "Maria Nova da Silva"
            apelido = "Maria"
            email = "maria.nova2@email.com"  # Email diferente para não duplicar
            senha = "senha123"
            cpf = "12345678909"  # CPF válido: 123.456.789-09
            data_de_nascimento = "1995-05-15"
        }
    } | ConvertTo-Json -Depth 3
    
    Write-Host "JSON sendo enviado:" -ForegroundColor Gray
    Write-Host $cadastroBody -ForegroundColor Gray
    Write-Host ""
    
    $response = Invoke-RestMethod -Uri "http://localhost:8181/api/v1/sessoes/cadastro" `
        -Method POST `
        -ContentType "application/json" `
        -Body $cadastroBody `
        -ErrorAction Stop
    
    Write-Host "✅ CADASTRO FUNCIONOU!" -ForegroundColor Green
    Write-Host "Resposta: $($response | ConvertTo-Json)" -ForegroundColor Green
} catch {
    Write-Host "❌ ERRO NO CADASTRO: $_" -ForegroundColor Red
    Write-Host "Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
}

Write-Host ""
Write-Host "🏁 Testes concluídos!" -ForegroundColor Cyan
