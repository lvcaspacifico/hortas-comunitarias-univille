<?php

// ================= CORS Headers =================
// Permitir requisições do frontend
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
if (in_array($origin, $allowedOrigins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

// Responder requisições OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
// ================================================

require __DIR__ . '/../vendor/autoload.php';

use DI\ContainerBuilder;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Dotenv\Dotenv;
use Slim\Factory\AppFactory;
use Illuminate\Database\Capsule\Manager as Capsule;
use App\Middlewares\FormatadorDeErrosMiddleware;
use App\Middlewares\ForcarJsonMiddleware;
use App\Middlewares\JwtMiddleware;
use App\Middlewares\RoutePermissionMiddleware;

// --------------- Carregando .env
$dotenv = Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();
foreach ($_SERVER as $key => $value) {
    if (getenv($key) !== false && !isset($_ENV[$key])) {
        $_ENV[$key] = $value;
    }
}

// --------------- Criando containder e adicionado registro de como criar dependências
$containerBuilder = new ContainerBuilder();
if (false) { // Setar true em prod
    $containerBuilder->enableCompilation(__DIR__ . '/../var/cache');
}
$dependencies = require __DIR__ . '/../config/dependencies.php';
$dependencies($containerBuilder);

$authDependencies = require __DIR__ . '/../config/auth.php';
$authDependencies($containerBuilder);

$container = $containerBuilder->build();
$container->get(Capsule::class);

// --------------- Criando app Slim
AppFactory::setContainer($container);
$app = AppFactory::create();

// --------------- Carregando rotas da API
$routes = require __DIR__ . '/../src/Routes/IndexRoutes.php';
$routes($app);

// --------------- Middlewares
// Nota: Middlewares são executados em ordem INVERSA (LIFO - Last In, First Out)
// Por isso, JwtMiddleware vem por último aqui (será executado primeiro)
$app->addBodyParsingMiddleware();
$app->addErrorMiddleware(true, true, true);
$app->add(ForcarJsonMiddleware::class);
$app->add(FormatadorDeErrosMiddleware::class);
// $app->add(RoutePermissionMiddleware::class); // ← Desabilitado temporariamente (sistema de permissões)
$app->add(JwtMiddleware::class); // JWT executado PRIMEIRO (adicionado por último)

// --------------- Rodando app
$app->run();
?>