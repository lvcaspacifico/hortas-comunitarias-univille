<?php

namespace App\Controllers;

use App\Services\PagamentoService;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use InvalidArgumentException;

class PagamentoController
{
    private PagamentoService $service;

    public function __construct(PagamentoService $service)
    {
        $this->service = $service;
    }

    public function list(Request $request, Response $response): Response
    {
        try {
            $pagamentos = $this->service->findAll();
            
            $formatted = $pagamentos->map(function ($p) {
                return [
                    'id' => $p->uuid,
                    'carteirista_uuid' => $p->carteirista_uuid,
                    'carteirista_nome' => $p->carteirista->nome ?? '',
                    'carteirista_telefone' => $p->carteirista->telefone ?? '',
                    'valor' => (float) $p->valor,
                    'forma_pagamento' => $p->forma_pagamento,
                    'data_pagamento' => $p->data_pagamento?->format('Y-m-d'),
                    'observacao' => $p->observacao,
                    'data_criacao' => $p->data_de_criacao?->format('Y-m-d H:i:s'),
                ];
            });

            $response->getBody()->write(json_encode([
                'success' => true,
                'data' => $formatted
            ]));
            return $response->withHeader('Content-Type', 'application/json');
        } catch (\Exception $e) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
        }
    }

    public function get(Request $request, Response $response, array $args): Response
    {
        try {
            $pagamento = $this->service->findByUuid($args['id']);
            
            $data = [
                'id' => $pagamento->uuid,
                'carteirista_uuid' => $pagamento->carteirista_uuid,
                'carteirista_nome' => $pagamento->carteirista->nome ?? '',
                'carteirista_telefone' => $pagamento->carteirista->telefone ?? '',
                'valor' => (float) $pagamento->valor,
                'forma_pagamento' => $pagamento->forma_pagamento,
                'data_pagamento' => $pagamento->data_pagamento?->format('Y-m-d'),
                'observacao' => $pagamento->observacao,
                'data_criacao' => $pagamento->data_de_criacao?->format('Y-m-d H:i:s'),
            ];

            $response->getBody()->write(json_encode([
                'success' => true,
                'data' => $data
            ]));
            return $response->withHeader('Content-Type', 'application/json');
        } catch (InvalidArgumentException $e) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
        } catch (\Exception $e) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
        }
    }

    public function create(Request $request, Response $response): Response
    {
        try {
            $data = $request->getParsedBody();
            $pagamento = $this->service->create($data);

            $responseData = [
                'id' => $pagamento->uuid,
                'carteirista_uuid' => $pagamento->carteirista_uuid,
                'valor' => (float) $pagamento->valor,
                'forma_pagamento' => $pagamento->forma_pagamento,
                'data_pagamento' => $pagamento->data_pagamento?->format('Y-m-d'),
                'observacao' => $pagamento->observacao,
            ];

            $response->getBody()->write(json_encode([
                'success' => true,
                'message' => 'Pagamento criado com sucesso',
                'data' => $responseData
            ]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(201);
        } catch (InvalidArgumentException $e) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        } catch (\Exception $e) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
        }
    }

    public function update(Request $request, Response $response, array $args): Response
    {
        try {
            $data = $request->getParsedBody();
            $pagamento = $this->service->update($args['id'], $data);

            $responseData = [
                'id' => $pagamento->uuid,
                'carteirista_uuid' => $pagamento->carteirista_uuid,
                'valor' => (float) $pagamento->valor,
                'forma_pagamento' => $pagamento->forma_pagamento,
                'data_pagamento' => $pagamento->data_pagamento?->format('Y-m-d'),
                'observacao' => $pagamento->observacao,
            ];

            $response->getBody()->write(json_encode([
                'success' => true,
                'message' => 'Pagamento atualizado com sucesso',
                'data' => $responseData
            ]));
            return $response->withHeader('Content-Type', 'application/json');
        } catch (InvalidArgumentException $e) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        } catch (\Exception $e) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
        }
    }

    public function delete(Request $request, Response $response, array $args): Response
    {
        try {
            $this->service->delete($args['id']);
            
            $response->getBody()->write(json_encode([
                'success' => true,
                'message' => 'Pagamento excluído com sucesso'
            ]));
            return $response->withHeader('Content-Type', 'application/json');
        } catch (InvalidArgumentException $e) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
        } catch (\Exception $e) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
        }
    }
}
