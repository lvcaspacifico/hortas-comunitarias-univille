<?php

namespace App\Controllers;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use App\Services\DependenteService;

class DependenteController
{
    protected DependenteService $dependenteService;

    public function __construct(DependenteService $dependenteService)
    {
        $this->dependenteService = $dependenteService;
    }

    public function list(Request $request, Response $response)
    {
        $payloadUsuarioLogado = [
            'usuario_uuid' => $request->getAttribute('usuario_uuid'),
            'cargo_uuid' => $request->getAttribute('cargo_uuid'),
            'associacao_uuid' => $request->getAttribute('associacao_uuid'),
            'horta_uuid' => $request->getAttribute('horta_uuid'),
        ];

        $dependentes = $this->dependenteService->findAllWhere($payloadUsuarioLogado);
        
        // Formatar resposta
        $dependentesFormatados = [];
        foreach ($dependentes as $dependente) {
            $dependentesFormatados[] = [
                'id' => $dependente->uuid,
                'nome' => $dependente->nome,
                'cpf' => $dependente->cpf,
                'idade' => $dependente->idade,
                'ativo' => $dependente->ativo,
                'carteirista_uuid' => $dependente->carteirista_uuid,
            ];
        }
        
        $response->getBody()->write(json_encode($dependentesFormatados));
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
        
        $dependente = $this->dependenteService->findByUuid($args['uuid'], $payloadUsuarioLogado);
        
        if (!$dependente) {
            $response->getBody()->write(json_encode(['error' => 'Dependente não encontrado']));
            return $response->withStatus(404);
        }

        $dependenteFormatado = [
            'id' => $dependente->uuid,
            'nome' => $dependente->nome,
            'cpf' => $dependente->cpf,
            'idade' => $dependente->idade,
            'ativo' => $dependente->ativo,
            'carteirista_uuid' => $dependente->carteirista_uuid,
        ];

        $response->getBody()->write(json_encode($dependenteFormatado));
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
        
        $dependente = $this->dependenteService->create($data, $payloadUsuarioLogado);

        $dependenteFormatado = [
            'id' => $dependente->uuid,
            'nome' => $dependente->nome,
            'cpf' => $dependente->cpf,
            'idade' => $dependente->idade,
            'ativo' => $dependente->ativo,
            'carteirista_uuid' => $dependente->carteirista_uuid,
        ];

        $response->getBody()->write(json_encode($dependenteFormatado));
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
        
        $dependente = $this->dependenteService->update($args['uuid'], $data, $payloadUsuarioLogado);

        if (!$dependente) {
            $response->getBody()->write(json_encode(['error' => 'Dependente não encontrado']));
            return $response->withStatus(404);
        }

        $dependenteFormatado = [
            'id' => $dependente->uuid,
            'nome' => $dependente->nome,
            'cpf' => $dependente->cpf,
            'idade' => $dependente->idade,
            'ativo' => $dependente->ativo,
            'carteirista_uuid' => $dependente->carteirista_uuid,
        ];

        $response->getBody()->write(json_encode($dependenteFormatado));
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
        
        $deleted = $this->dependenteService->delete($args['uuid'], $payloadUsuarioLogado);

        if (!$deleted) {
            $response->getBody()->write(json_encode(['error' => 'Dependente não encontrado']));
            return $response->withStatus(404);
        }

        $response->getBody()->write(json_encode(['message' => 'Dependente excluído com sucesso']));
        return $response->withStatus(200);
    }
}
