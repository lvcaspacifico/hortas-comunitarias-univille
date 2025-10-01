<?php
namespace App\Controllers;

use App\Services\CargoService;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class CargoController
{
    protected CargoService $cargoService;
    public function __construct(CargoService $cargoService){
        $this->cargoService = $cargoService;
    }

    public function list(Request $request, Response $response)
    {
        $payloadUsuarioLogado = [
            'usuario_uuid' => $request->getAttribute('usuario_uuid'),
            'cargo_uuid' => $request->getAttribute('cargo_uuid'),
            'associacao_uuid' => $request->getAttribute('associacao_uuid'),
            'horta_uuid' => $request->getAttribute('horta_uuid'),
        ];
        $cargos = $this->cargoService->findAllWhere($payloadUsuarioLogado);
        $response->getBody()->write(json_encode($cargos));
        return $response->withStatus(200);
    }

    public function get(Request $request, Response $response, array $args)
    {
        $payloadUsuarioLogado = [
            'usuario_uuid' => $request->getAttribute('usuario_uuid'),
            'cargo_uuid' => $request->getAttribute('cargo_uuid'),
            'associacao_uuid' => $request->getAttribute('associacao_uuid'),
            'horta_uuid' => $request->getAttribute('horta_uuid'),
        ];
        $cargo = $this->cargoService->findByUuid($args['uuid'], $payloadUsuarioLogado);
        if(!$cargo) return $response->withStatus(404);

        $response->getBody()->write(json_encode($cargo));
        return $response->withStatus(200);
    }

    public function create(Request $request, Response $response){
        
        $payloadUsuarioLogado = [
            'usuario_uuid' => $request->getAttribute('usuario_uuid'),
            'cargo_uuid' => $request->getAttribute('cargo_uuid'),
            'associacao_uuid' => $request->getAttribute('associacao_uuid'),
            'horta_uuid' => $request->getAttribute('horta_uuid'),
        ];
        $data = (array)$request->getParsedBody(); 
        $cargo = $this->cargoService->create($data,$payloadUsuarioLogado);

        $response->getBody()->write(json_encode($cargo));
        return $response->withStatus(201);
    }

    public function update(Request $request, Response $response, array $args)
    {
        
        $payloadUsuarioLogado = [
            'usuario_uuid' => $request->getAttribute('usuario_uuid'),
            'cargo_uuid' => $request->getAttribute('cargo_uuid'),
            'associacao_uuid' => $request->getAttribute('associacao_uuid'),
            'horta_uuid' => $request->getAttribute('horta_uuid'),
        ];

        $data = (array)$request->getParsedBody(); 
        $cargo = $this->cargoService->update($args['uuid'], $data, $payloadUsuarioLogado);
        
        $response->getBody()->write(json_encode($cargo));
        return $response->withStatus(200);
    }

    public function delete(Request $request, Response $response, array $args)
    {
        
        $payloadUsuarioLogado = [
            'usuario_uuid' => $request->getAttribute('usuario_uuid'),
            'cargo_uuid' => $request->getAttribute('cargo_uuid'),
            'associacao_uuid' => $request->getAttribute('associacao_uuid'),
            'horta_uuid' => $request->getAttribute('horta_uuid'),
        ]; 
        $this->cargoService->delete($args['uuid'], $payloadUsuarioLogado);

        $response->getBody()->write(json_encode([
            "message" => "Registro UUID: " . $args['uuid'] . " excluído"
        ]));
        return $response->withStatus(200);
    }
}
