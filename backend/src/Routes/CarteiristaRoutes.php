<?php
 
use App\Controllers\CarteiristaController;
use Slim\Routing\RouteCollectorProxy;

return function(RouteCollectorProxy $app){
    $app->group('/carteiristas', function(RouteCollectorProxy $group){
        $group->get('', CarteiristaController::class.':list');
        $group->get('/{uuid}', CarteiristaController::class.':get');
        $group->post('', CarteiristaController::class.':create');
        $group->put('/{uuid}', CarteiristaController::class.':update');
        $group->delete('/{uuid}', CarteiristaController::class.':delete');
    });
};
