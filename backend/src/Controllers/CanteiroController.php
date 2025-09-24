<?php

namespace App\Controllers;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use App\Services\CanteiroService;

class CanteiroController
{
    protected CanteiroService $canteiroService;

    public function __construct(CanteiroService $canteiroService)
    {
        $this->canteiroService = $canteiroService;
    }

    
    public function list(Request $request, Response $response)
    {
        $canteiros = $this->canteiroService->findAllWhere();
        $response->getBody()->write(json_encode($canteiros));
        return $response->withStatus(200);
    }

    public function get(Request $request, Response $response, array $args)
    {
        $canteiro = $this->canteiroService->findByUuid($args['uuid']);
        if (!$canteiro) return $response->withStatus(404);

        $response->getBody()->write(json_encode($canteiro));
        return $response->withStatus(200);
    }

    public function create(Request $request, Response $response)
    {
        $data = (array)$request->getParsedBody();
        $uuidUsuarioLogado = $request->getAttribute('usuario_uuid');
        $canteiro = $this->canteiroService->create($data, $uuidUsuarioLogado);

        $response->getBody()->write(json_encode($canteiro));
        return $response->withStatus(201);
    }

    public function update(Request $request, Response $response, array $args)
    {
        $data = (array)$request->getParsedBody();
        $uuidUsuarioLogado = $request->getAttribute('usuario_uuid');
        $canteiro = $this->canteiroService->update($args['uuid'], $data, $uuidUsuarioLogado);

        $response->getBody()->write(json_encode($canteiro));
        return $response->withStatus(200);
    }

    public function delete(Request $request, Response $response, array $args){   
        $uuidUsuarioLogado = $request->getAttribute('usuario_uuid');
        $this->canteiroService->delete($args['uuid'], $uuidUsuarioLogado);
        
        $response->getBody()->write(json_encode([
            "message" => "Registro UUID: " . $args['uuid'] . " excluído"
        ]));
        return $response->withStatus(200);
    }
}
