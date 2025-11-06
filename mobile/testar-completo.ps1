# 🧪 SCRIPT DE TESTE COMPLETO - Mobile App
# Testa todas as funcionalidades do app mobile

Write-Host "🌱 TESTE COMPLETO - HORTAS COMUNITÁRIAS MOBILE" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""

$ErrorActionPreference = "Stop"
$baseUrl = "http://localhost:8181/api/v1"
$token = $null

# Função para exibir resultado
function Show-Result {
    param($Test, $Success, $Message)
    
    if ($Success) {
        Write-Host "✅ $Test" -ForegroundColor Green
        if ($Message) { Write-Host "   → $Message" -ForegroundColor Gray }
    } else {
        Write-Host "❌ $Test" -ForegroundColor Red
        if ($Message) { Write-Host "   → $Message" -ForegroundColor Yellow }
    }
}

# Função para fazer requisição
function Invoke-ApiRequest {
    param($Method, $Endpoint, $Body = $null, $UseToken = $false)
    
    try {
        $headers = @{
            "Content-Type" = "application/json"
        }
        
        if ($UseToken -and $token) {
            $headers["Authorization"] = "Bearer $token"
        }
        
        $params = @{
            Uri = "$baseUrl$Endpoint"
            Method = $Method
            Headers = $headers
            UseBasicParsing = $true
        }
        
        if ($Body) {
            $params["Body"] = ($Body | ConvertTo-Json -Depth 10)
        }
        
        $response = Invoke-RestMethod @params
        return @{ Success = $true; Data = $response }
    }
    catch {
        return @{ Success = $false; Error = $_.Exception.Message }
    }
}

Write-Host "FASE 1: VERIFICAÇÃO DE AMBIENTE" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Teste 1.1: Docker rodando
try {
    docker --version | Out-Null
    Show-Result "Docker instalado" $true
} catch {
    Show-Result "Docker instalado" $false "Docker não encontrado"
}

# Teste 1.2: Containers ativos
try {
    $containers = docker-compose ps --format json | ConvertFrom-Json
    $mysqlRunning = $containers | Where-Object { $_.Service -eq "mysql" -and $_.State -eq "running" }
    $phpRunning = $containers | Where-Object { $_.Service -eq "php" -and $_.State -eq "running" }
    
    Show-Result "MySQL container" ($null -ne $mysqlRunning) $(if ($mysqlRunning) { "Rodando" } else { "Parado" })
    Show-Result "PHP container" ($null -ne $phpRunning) $(if ($phpRunning) { "Rodando" } else { "Parado" })
} catch {
    Show-Result "Containers" $false "Erro ao verificar containers"
}

# Teste 1.3: API respondendo
$apiCheck = Invoke-ApiRequest -Method "GET" -Endpoint "/"
Show-Result "API respondendo" $apiCheck.Success $(if ($apiCheck.Success) { "Backend online" } else { $apiCheck.Error })

Write-Host ""
Write-Host "FASE 2: AUTENTICAÇÃO" -ForegroundColor Cyan
Write-Host "====================" -ForegroundColor Cyan
Write-Host ""

# Teste 2.1: Login com admin
$loginBody = @{
    email = "admin@admin.com"
    senha = "admin123"
}

$loginResult = Invoke-ApiRequest -Method "POST" -Endpoint "/sessoes/login" -Body $loginBody
if ($loginResult.Success) {
    $token = if ($loginResult.Data.token) { $loginResult.Data.token } else { $loginResult.Data.data.token }
    Show-Result "Login admin" $true "Token recebido"
} else {
    Show-Result "Login admin" $false $loginResult.Error
    Write-Host ""
    Write-Host "⚠️  Não foi possível continuar sem login" -ForegroundColor Yellow
    exit 1
}

# Teste 2.2: Verificar token
if ($token) {
    Show-Result "Token JWT válido" $true "Token: $($token.Substring(0, 20))..."
} else {
    Show-Result "Token JWT válido" $false "Token não encontrado na resposta"
}

Write-Host ""
Write-Host "FASE 3: ENDPOINTS PRINCIPAIS" -ForegroundColor Cyan
Write-Host "=============================" -ForegroundColor Cyan
Write-Host ""

# Teste 3.1: Associações
$associacoes = Invoke-ApiRequest -Method "GET" -Endpoint "/associacoes" -UseToken $true
$assocCount = if ($associacoes.Success) { if ($associacoes.Data.data.Count) { $associacoes.Data.data.Count } elseif ($associacoes.Data.Count) { $associacoes.Data.Count } else { 0 } } else { 0 }
Show-Result "GET /associacoes" $associacoes.Success $(if ($associacoes.Success) { "$assocCount associações" } else { $associacoes.Error })

# Teste 3.2: Hortas
$hortas = Invoke-ApiRequest -Method "GET" -Endpoint "/hortas" -UseToken $true
$hortasCount = if ($hortas.Success) { if ($hortas.Data.data.Count) { $hortas.Data.data.Count } elseif ($hortas.Data.Count) { $hortas.Data.Count } else { 0 } } else { 0 }
Show-Result "GET /hortas" $hortas.Success $(if ($hortas.Success) { "$hortasCount hortas" } else { $hortas.Error })

# Teste 3.3: Canteiros
$canteiros = Invoke-ApiRequest -Method "GET" -Endpoint "/canteiros" -UseToken $true
$canteirosCount = if ($canteiros.Success) { if ($canteiros.Data.data.Count) { $canteiros.Data.data.Count } elseif ($canteiros.Data.Count) { $canteiros.Data.Count } else { 0 } } else { 0 }
Show-Result "GET /canteiros" $canteiros.Success $(if ($canteiros.Success) { "$canteirosCount canteiros" } else { $canteiros.Error })

# Teste 3.4: Usuários
$usuarios = Invoke-ApiRequest -Method "GET" -Endpoint "/usuarios" -UseToken $true
$usuariosCount = if ($usuarios.Success) { if ($usuarios.Data.data.Count) { $usuarios.Data.data.Count } elseif ($usuarios.Data.Count) { $usuarios.Data.Count } else { 0 } } else { 0 }
Show-Result "GET /usuarios" $usuarios.Success $(if ($usuarios.Success) { "$usuariosCount usuários" } else { $usuarios.Error })

Write-Host ""
Write-Host "FASE 4: NOVOS ENDPOINTS (Update 05/11)" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

# Teste 4.1: Carteiristas
$carteiristas = Invoke-ApiRequest -Method "GET" -Endpoint "/carteiristas" -UseToken $true
$cartCount = if ($carteiristas.Success) { if ($carteiristas.Data.data.Count) { $carteiristas.Data.data.Count } elseif ($carteiristas.Data.Count) { $carteiristas.Data.Count } else { 0 } } else { 0 }
Show-Result "GET /carteiristas" $carteiristas.Success $(if ($carteiristas.Success) { "$cartCount carteiristas" } else { $carteiristas.Error })

# Teste 4.2: Dependentes
$dependentes = Invoke-ApiRequest -Method "GET" -Endpoint "/dependentes" -UseToken $true
$depCount = if ($dependentes.Success) { if ($dependentes.Data.data.Count) { $dependentes.Data.data.Count } elseif ($dependentes.Data.Count) { $dependentes.Data.Count } else { 0 } } else { 0 }
Show-Result "GET /dependentes" $dependentes.Success $(if ($dependentes.Success) { "$depCount dependentes" } else { $dependentes.Error })

# Teste 4.3: Pagamentos
$pagamentos = Invoke-ApiRequest -Method "GET" -Endpoint "/pagamentos" -UseToken $true
$pagCount = if ($pagamentos.Success) { if ($pagamentos.Data.data.Count) { $pagamentos.Data.data.Count } elseif ($pagamentos.Data.Count) { $pagamentos.Data.Count } else { 0 } } else { 0 }
Show-Result "GET /pagamentos" $pagamentos.Success $(if ($pagamentos.Success) { "$pagCount pagamentos" } else { $pagamentos.Error })

# Teste 4.4: Notificações
$notificacoes = Invoke-ApiRequest -Method "GET" -Endpoint "/notificacoes" -UseToken $true
$notCount = if ($notificacoes.Success) { if ($notificacoes.Data.data.Count) { $notificacoes.Data.data.Count } elseif ($notificacoes.Data.Count) { $notificacoes.Data.Count } else { 0 } } else { 0 }
Show-Result "GET /notificacoes" $notificacoes.Success $(if ($notificacoes.Success) { "$notCount notificações" } else { $notificacoes.Error })

Write-Host ""
Write-Host "FASE 5: VERIFICAÇÃO DO MOBILE" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan
Write-Host ""

# Teste 5.1: Node.js instalado
try {
    $nodeVersion = node --version
    Show-Result "Node.js instalado" $true "Versão: $nodeVersion"
} catch {
    Show-Result "Node.js instalado" $false "Node.js não encontrado"
}

# Teste 5.2: npm instalado
try {
    $npmVersion = npm --version
    Show-Result "npm instalado" $true "Versão: $npmVersion"
} catch {
    Show-Result "npm instalado" $false "npm não encontrado"
}

# Teste 5.3: package.json existe
$packageJsonPath = Join-Path $PSScriptRoot "package.json"
if (Test-Path $packageJsonPath) {
    Show-Result "package.json encontrado" $true
    
    # Teste 5.4: Dependências instaladas
    $nodeModulesPath = Join-Path $PSScriptRoot "node_modules"
    if (Test-Path $nodeModulesPath) {
        Show-Result "Dependências instaladas" $true "node_modules/ presente"
    } else {
        Show-Result "Dependências instaladas" $false "Execute: npm install --legacy-peer-deps"
    }
} else {
    Show-Result "package.json encontrado" $false
}

# Teste 5.5: app.json configurado
$appJsonPath = Join-Path $PSScriptRoot "app.json"
if (Test-Path $appJsonPath) {
    Show-Result "app.json encontrado" $true
    
    try {
        $appJson = Get-Content $appJsonPath | ConvertFrom-Json
        $apiUrl = $appJson.expo.extra.apiUrl
        Show-Result "API URL configurada" $true "URL: $apiUrl"
        
        if ($apiUrl -like "*localhost*" -or $apiUrl -like "*127.0.0.1*") {
            Write-Host "   ⚠️  Usando localhost - certifique-se que celular está na mesma rede" -ForegroundColor Yellow
        }
    } catch {
        Show-Result "API URL configurada" $false "Erro ao ler app.json"
    }
} else {
    Show-Result "app.json encontrado" $false
}

Write-Host ""
Write-Host "RESUMO DO TESTE" -ForegroundColor Cyan
Write-Host "===============" -ForegroundColor Cyan
Write-Host ""

Write-Host "🔧 Backend:" -ForegroundColor White
Write-Host "   - API: " -NoNewline
if ($apiCheck.Success) {
    Write-Host "✅ Online" -ForegroundColor Green
} else {
    Write-Host "❌ Offline" -ForegroundColor Red
}

Write-Host "   - Auth: " -NoNewline
if ($loginResult.Success) {
    Write-Host "✅ Funcionando" -ForegroundColor Green
} else {
    Write-Host "❌ Com problemas" -ForegroundColor Red
}

Write-Host ""
Write-Host "📱 Mobile:" -ForegroundColor White
Write-Host "   - Configuração: " -NoNewline
if ((Test-Path $packageJsonPath) -and (Test-Path $appJsonPath)) {
    Write-Host "✅ OK" -ForegroundColor Green
} else {
    Write-Host "❌ Incompleta" -ForegroundColor Red
}

Write-Host "   - Dependências: " -NoNewline
if (Test-Path $nodeModulesPath) {
    Write-Host "✅ Instaladas" -ForegroundColor Green
} else {
    Write-Host "❌ Não instaladas" -ForegroundColor Red
}

Write-Host ""
Write-Host "🌐 Endpoints Testados:" -ForegroundColor White
$endpoints = @(
    @{Name="Autenticação"; Result=$loginResult.Success},
    @{Name="Associações"; Result=$associacoes.Success},
    @{Name="Hortas"; Result=$hortas.Success},
    @{Name="Canteiros"; Result=$canteiros.Success},
    @{Name="Usuários"; Result=$usuarios.Success},
    @{Name="Carteiristas"; Result=$carteiristas.Success},
    @{Name="Dependentes"; Result=$dependentes.Success},
    @{Name="Pagamentos"; Result=$pagamentos.Success},
    @{Name="Notificações"; Result=$notificacoes.Success}
)

$totalEndpoints = $endpoints.Count
$successEndpoints = ($endpoints | Where-Object { $_.Result }).Count

Write-Host "   - Funcionando: $successEndpoints/$totalEndpoints" -ForegroundColor $(if ($successEndpoints -eq $totalEndpoints) { "Green" } else { "Yellow" })

Write-Host ""
Write-Host "PRÓXIMOS PASSOS" -ForegroundColor Cyan
Write-Host "===============" -ForegroundColor Cyan
Write-Host ""

# Verificar se node_modules existe
$nodeModulesExists = Test-Path $nodeModulesPath

if ($apiCheck.Success -and $loginResult.Success -and $nodeModulesExists) {
    Write-Host "✅ Tudo pronto para testar!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Para iniciar o app mobile:" -ForegroundColor White
    Write-Host "   1. Execute: " -NoNewline -ForegroundColor Gray
    Write-Host "npx expo start" -ForegroundColor Yellow
    Write-Host "   2. Escaneie o QR code com Expo Go" -ForegroundColor Gray
    Write-Host "   3. Teste login com: admin@admin.com / admin123" -ForegroundColor Gray
    Write-Host ""
    Write-Host "📖 Consulte PLANO_APRESENTACAO.md para roteiro completo" -ForegroundColor Cyan
}
else {
    Write-Host "⚠️  Ajustes necessários:" -ForegroundColor Yellow
    Write-Host ""
    
    if (-not $apiCheck.Success) {
        Write-Host "   1. Inicie o backend:" -ForegroundColor Gray
        Write-Host "      docker-compose up -d mysql php nginx" -ForegroundColor Yellow
    }
    
    if (-not $loginResult.Success) {
        Write-Host "   2. Verifique o banco de dados:" -ForegroundColor Gray
        Write-Host "      docker-compose exec php php run-migrations.php" -ForegroundColor Yellow
        Write-Host "      docker-compose exec php php run-seeds.php" -ForegroundColor Yellow
    }
    
    if (-not (Test-Path $nodeModulesPath)) {
        Write-Host "   3. Instale dependências do mobile:" -ForegroundColor Gray
        Write-Host "      cd mobile" -ForegroundColor Yellow
        Write-Host "      npm install --legacy-peer-deps" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "Teste concluído em $(Get-Date -Format 'HH:mm:ss')" -ForegroundColor Gray
Write-Host "================================================" -ForegroundColor Green
