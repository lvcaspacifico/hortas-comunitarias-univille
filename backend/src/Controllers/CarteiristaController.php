<?php

namespace App\Controllers;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use App\Services\CarteiristaService;

class CarteiristaController
{
    protected CarteiristaService $carteiristaService;

    public function __construct(CarteiristaService $carteiristaService)
    {
        $this->carteiristaService = $carteiristaService;
    }

    public function list(Request $request, Response $response)
    {
        $payloadUsuarioLogado = [
            'usuario_uuid' => $request->getAttribute('usuario_uuid'),
            'cargo_uuid' => $request->getAttribute('cargo_uuid'),
            'associacao_uuid' => $request->getAttribute('associacao_uuid'),
            'horta_uuid' => $request->getAttribute('horta_uuid'),
        ];

        $carteiristas = $this->carteiristaService->findAllWhere($payloadUsuarioLogado);
        
        // Formatar resposta
        $carteiristasFormatados = [];
        foreach ($carteiristas as $carteirista) {
            $carteiristasFormatados[] = [
                'id' => $carteirista->uuid,
                'nome' => $carteirista->nome,
                'telefone' => $carteirista->telefone,
            ];
        }
        
        $response->getBody()->write(json_encode($carteiristasFormatados));
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
        
        $carteirista = $this->carteiristaService->findByUuid($args['uuid'], $payloadUsuarioLogado);
        
        if (!$carteirista) {
            $response->getBody()->write(json_encode(['error' => 'Carteirista não encontrado']));
            return $response->withStatus(404);
        }

        $carteiristaFormatado = [
            'id' => $carteirista->uuid,
            'nome' => $carteirista->nome,
            'telefone' => $carteirista->telefone,
        ];

        $response->getBody()->write(json_encode($carteiristaFormatado));
        return $response->withStatus(200);
    }

    public function create(Request $request, Response $response)
    {
        $payloadUsuarioLogado = [
            'usuario_uuid' => $request->getAttribute('usuario_uuid'),
            'cargo_uuid' => $request->getAttribute('cargo_uuid'),
            'associacao_uuid' => $request->getAttribute('associacao_uuid'),
            'horta_uuid' => $request->getAttribute('horta_uuid'),
        ];
        
        $data = (array)$request->getParsedBody();
        
        $carteirista = $this->carteiristaService->create($data, $payloadUsuarioLogado);

        $carteiristaFormatado = [
            'id' => $carteirista->uuid,
            'nome' => $carteirista->nome,
            'telefone' => $carteirista->telefone,
        ];

        $response->getBody()->write(json_encode($carteiristaFormatado));
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
        
        $carteirista = $this->carteiristaService->update($args['uuid'], $data, $payloadUsuarioLogado);

        if (!$carteirista) {
            $response->getBody()->write(json_encode(['error' => 'Carteirista não encontrado']));
            return $response->withStatus(404);
        }

        $carteiristaFormatado = [
            'id' => $carteirista->uuid,
            'nome' => $carteirista->nome,
            'telefone' => $carteirista->telefone,
        ];

        $response->getBody()->write(json_encode($carteiristaFormatado));
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
        
        $deleted = $this->carteiristaService->delete($args['uuid'], $payloadUsuarioLogado);

        if (!$deleted) {
            $response->getBody()->write(json_encode(['error' => 'Carteirista não encontrado']));
            return $response->withStatus(404);
        }

        $response->getBody()->write(json_encode(['message' => 'Carteirista excluído com sucesso']));
        return $response->withStatus(200);
    }
}
