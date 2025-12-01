<?php
 
use App\Controllers\DependenteController;
use Slim\Routing\RouteCollectorProxy;

return function(RouteCollectorProxy $app){
    $app->group('/dependentes', function(RouteCollectorProxy $group){
        $group->get('', DependenteController::class.':list');
        $group->get('/{uuid}', DependenteController::class.':get');
        $group->post('', DependenteController::class.':create');
        $group->put('/{uuid}', DependenteController::class.':update');
        $group->delete('/{uuid}', DependenteController::class.':delete');
    });
};
