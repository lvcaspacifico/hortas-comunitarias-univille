<?php

use DI\ContainerBuilder;
use App\Models\NotificacaoModel;
use App\Repositories\NotificacaoRepository;
use App\Services\NotificacaoService;
use App\Controllers\NotificacaoController;

return function (ContainerBuilder $containerBuilder) {
    $containerBuilder->addDefinitions([
        NotificacaoModel::class => DI\autowire(),
        NotificacaoRepository::class => DI\autowire(),
        NotificacaoService::class => DI\autowire(),
        NotificacaoController::class => DI\autowire(),
    ]);
};
