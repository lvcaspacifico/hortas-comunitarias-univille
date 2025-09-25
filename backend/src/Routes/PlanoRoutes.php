<?php

use App\Controllers\PlanoController;
use App\Middlewares\JwtMiddleware;
use Slim\Routing\RouteCollectorProxy;

return function (RouteCollectorProxy $app) {
    $jwtMiddleware = new JwtMiddleware();

    $app->group('/planos', function (RouteCollectorProxy $group) {
        $group->get('', PlanoController::class . ':list');
        $group->get('/{uuid}', PlanoController::class . ':get');
        $group->get('/usuario/{uuid}', PlanoController::class . ':getByUsuario');
        $group->post('', PlanoController::class . ':create');
        $group->put('/{uuid}', PlanoController::class . ':update');
        $group->delete('/{uuid}', PlanoController::class . ':delete');
    })->add($jwtMiddleware);
};
