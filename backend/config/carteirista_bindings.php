<?php
use DI\ContainerBuilder;
use App\Models\CarteiristaModel;
use App\Repositories\CarteiristaRepository;
use App\Services\CarteiristaService;
use App\Controllers\CarteiristaController;

return function(ContainerBuilder $container){
    $container->addDefinitions([
        CarteiristaModel::class => DI\autowire(CarteiristaModel::class),
        CarteiristaRepository::class => DI\autowire(CarteiristaRepository::class),
        CarteiristaService::class => DI\autowire(CarteiristaService::class),
        CarteiristaController::class => DI\autowire(CarteiristaController::class),
    ]);
};
