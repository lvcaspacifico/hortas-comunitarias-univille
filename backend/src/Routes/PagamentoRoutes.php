<?php

use Slim\Routing\RouteCollectorProxy;
use App\Controllers\PagamentoController;

return function (RouteCollectorProxy $group) {
    $group->group('/pagamentos', function (RouteCollectorProxy $group) {
        $group->get('', [PagamentoController::class, 'list']);
        $group->get('/{id}', [PagamentoController::class, 'get']);
        $group->post('', [PagamentoController::class, 'create']);
        $group->put('/{id}', [PagamentoController::class, 'update']);
        $group->delete('/{id}', [PagamentoController::class, 'delete']);
    });
};
