<?php

use DI\ContainerBuilder;
use App\Models\PagamentoModel;
use App\Repositories\PagamentoRepository;
use App\Services\PagamentoService;
use App\Controllers\PagamentoController;

return function (ContainerBuilder $containerBuilder) {
    $containerBuilder->addDefinitions([
        PagamentoModel::class => DI\autowire(),
        PagamentoRepository::class => DI\autowire(),
        PagamentoService::class => DI\autowire(),
        PagamentoController::class => DI\autowire(),
    ]);
};
