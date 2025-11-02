<?php
use DI\ContainerBuilder;
use App\Models\DependenteModel;
use App\Repositories\DependenteRepository;
use App\Services\DependenteService;
use App\Controllers\DependenteController;

return function(ContainerBuilder $container){
    $container->addDefinitions([
        DependenteModel::class => DI\autowire(DependenteModel::class),
        DependenteRepository::class => DI\autowire(DependenteRepository::class),
        DependenteService::class => DI\autowire(DependenteService::class),
        DependenteController::class => DI\autowire(DependenteController::class),
    ]);
};
