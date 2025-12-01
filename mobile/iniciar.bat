@echo off
chcp 65001 >nul
echo.
echo 🚀 Iniciando Hortas Mobile...
echo.

cd /d "%~dp0"

if exist "node_modules" (
    echo ✅ Dependências já instaladas
) else (
    echo 📦 Instalando dependências...
    call npm install --legacy-peer-deps
)

echo.
echo 🎯 Iniciando servidor Expo em MODO TUNNEL...
echo.
echo ⚡ Modo TUNNEL ativado - funciona em qualquer rede!
echo.
echo Aguarde o QR code aparecer e escaneie com o Expo Go no seu celular!
echo (Pode demorar um pouco mais na primeira vez)
echo.

call npm start -- --tunnel
