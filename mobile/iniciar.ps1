# Script para iniciar o app mobile
# Garante que o Node.js está no PATH e executa npm start

Write-Host "🚀 Iniciando Hortas Mobile..." -ForegroundColor Green

# Adicionar Node.js ao PATH
$nodePath = "C:\Program Files\nodejs"
if (Test-Path $nodePath) {
    $env:Path = "$nodePath;$env:Path"
    Write-Host "✅ Node.js encontrado: $nodePath" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js não encontrado em $nodePath" -ForegroundColor Red
    Write-Host "Por favor, instale o Node.js em: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Verificar se estamos na pasta mobile
$currentPath = Get-Location
if (-not ($currentPath.Path -like "*\mobile")) {
    Write-Host "⚠️  Navegando para a pasta mobile..." -ForegroundColor Yellow
    Set-Location -Path "mobile" -ErrorAction SilentlyContinue
}

# Verificar se node_modules existe
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
    npm install --legacy-peer-deps
}

# Iniciar o app
Write-Host "🎯 Iniciando servidor Expo..." -ForegroundColor Green
Write-Host ""
Write-Host "Aguarde o QR code aparecer e escaneie com o Expo Go no seu celular!" -ForegroundColor Cyan
Write-Host ""

npx expo start
