<?php
require __DIR__ . '/vendor/autoload.php';

use DI\ContainerBuilder;
use Illuminate\Database\Capsule\Manager as Capsule;
use Dotenv\Dotenv;

// Carrega .env se existir
if (file_exists(__DIR__ . '/.env')) {
    $dotenv = Dotenv::createImmutable(__DIR__);
    $dotenv->load();
}

foreach ($_SERVER as $key => $value) {
    if (getenv($key) !== false && !isset($_ENV[$key])) {
        $_ENV[$key] = $value;
    }
}

// Inicializa container
$containerBuilder = new ContainerBuilder();
$dependencies = require __DIR__ . '/config/dependencies.php';
$dependencies($containerBuilder);
$container = $containerBuilder->build();

$capsule = $container->get(Capsule::class);

// Executar seeds SQL
$seeds = [
    'src/Utils/SQL/01_SQL_criar_banco_dev.sql',
    'src/Utils/SQL/02_SQL_seed_dados_iniciais.sql',
    'src/Utils/SQL/03_SQL_seed_dados_teste.sql'
];

foreach ($seeds as $seedFile) {
    $fullPath = __DIR__ . '/' . $seedFile;
    
    if (!file_exists($fullPath)) {
        echo "❌ Arquivo não encontrado: $seedFile\n";
        continue;
    }
    
    echo "Executando $seedFile...\n";
    $sql = file_get_contents($fullPath);
    
    try {
        $capsule::connection()->unprepared($sql);
        echo "✓ $seedFile executado com sucesso!\n";
    } catch (Exception $e) {
        echo "❌ Erro ao executar $seedFile: " . $e->getMessage() . "\n";
    }
}

echo "\n✅ Processo de seeds finalizado!\n";
