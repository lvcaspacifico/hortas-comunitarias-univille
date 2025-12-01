<?php

namespace App\Controllers;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use App\Services\HortaService;

class HortaController
{
    protected HortaService $hortaService;

    public function __construct(HortaService $hortaService)
    {
        $this->hortaService = $hortaService;
    }

    
    public function list(Request $request, Response $response)
    {
        $payloadUsuarioLogado = [
            'usuario_uuid' => $request->getAttribute('usuario_uuid'),
            'cargo_uuid' => $request->getAttribute('cargo_uuid'),
            'associacao_uuid' => $request->getAttribute('associacao_uuid'),
            'horta_uuid' => $request->getAttribute('horta_uuid'),
        ];
        $hortas = $this->hortaService->findAllWhere([], $payloadUsuarioLogado);
        
        // Transformar dados para o formato esperado pelo frontend
        $hortasFormatadas = $hortas->map(function($horta) {
            return [
                'id' => $horta->uuid,
                'uuid' => $horta->uuid,
                'nome' => $horta->nome_da_horta,
                'nome_da_horta' => $horta->nome_da_horta,
                'localizacao' => $horta->endereco->logradouro ?? null,
                'telefone' => $horta->telefone_de_contato ?? null,
                'responsavel' => $horta->nome_do_responsavel ?? null,
                'endereco_uuid' => $horta->endereco_uuid,
                'associacao_vinculada_uuid' => $horta->associacao_vinculada_uuid,
                'percentual_taxa_associado' => $horta->percentual_taxa_associado,
                'tipo_de_liberacao' => $horta->tipo_de_liberacao,
                'excluido' => $horta->excluido,
                'data_de_criacao' => $horta->data_de_criacao,
                'data_de_ultima_alteracao' => $horta->data_de_ultima_alteracao,
            ];
        });
        
        $response->getBody()->write(json_encode($hortasFormatadas));
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
        $horta = $this->hortaService->findByUuid($args['uuid'], $payloadUsuarioLogado );
        if (!$horta) return $response->withStatus(404);

        // Formatar resposta para o frontend
        $hortaFormatada = [
            'id' => $horta->uuid,
            'uuid' => $horta->uuid,
            'nome' => $horta->nome_da_horta,
            'nome_da_horta' => $horta->nome_da_horta,
            'localizacao' => $horta->endereco->logradouro ?? null,
            'telefone' => $horta->telefone_de_contato ?? null,
            'responsavel' => $horta->nome_do_responsavel ?? null,
            'endereco_uuid' => $horta->endereco_uuid,
            'associacao_vinculada_uuid' => $horta->associacao_vinculada_uuid,
            'percentual_taxa_associado' => $horta->percentual_taxa_associado,
            'tipo_de_liberacao' => $horta->tipo_de_liberacao,
            'excluido' => $horta->excluido,
            'data_de_criacao' => $horta->data_de_criacao,
            'data_de_ultima_alteracao' => $horta->data_de_ultima_alteracao,
        ];

        $response->getBody()->write(json_encode($hortaFormatada));
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
        $uuidUsuarioLogado = $request->getAttribute('usuario_uuid');
        $horta = $this->hortaService->create($data, $payloadUsuarioLogado);

        // Formatar resposta para o frontend
        $hortaFormatada = [
            'id' => $horta->uuid,
            'uuid' => $horta->uuid,
            'nome' => $horta->nome_da_horta,
            'nome_da_horta' => $horta->nome_da_horta,
            'localizacao' => $horta->endereco->logradouro ?? null,
            'telefone' => $horta->telefone_de_contato ?? null,
            'responsavel' => $horta->nome_do_responsavel ?? null,
            'endereco_uuid' => $horta->endereco_uuid,
            'associacao_vinculada_uuid' => $horta->associacao_vinculada_uuid,
            'percentual_taxa_associado' => $horta->percentual_taxa_associado,
            'tipo_de_liberacao' => $horta->tipo_de_liberacao,
            'excluido' => $horta->excluido,
            'data_de_criacao' => $horta->data_de_criacao,
            'data_de_ultima_alteracao' => $horta->data_de_ultima_alteracao,
        ];

        $response->getBody()->write(json_encode($hortaFormatada));
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
        $uuidUsuarioLogado = $request->getAttribute('usuario_uuid');
        $horta = $this->hortaService->update($args['uuid'], $data, $payloadUsuarioLogado);

        // Formatar resposta para o frontend (igual ao create e get)
        $hortaFormatada = [
            'id' => $horta->uuid,
            'uuid' => $horta->uuid,
            'nome' => $horta->nome_da_horta,
            'nome_da_horta' => $horta->nome_da_horta,
            'localizacao' => $horta->endereco->logradouro ?? null,
            'telefone' => $horta->telefone_de_contato ?? null,
            'responsavel' => $horta->nome_do_responsavel ?? null,
            'endereco_uuid' => $horta->endereco_uuid,
            'associacao_vinculada_uuid' => $horta->associacao_vinculada_uuid,
            'percentual_taxa_associado' => $horta->percentual_taxa_associado,
            'tipo_de_liberacao' => $horta->tipo_de_liberacao,
            'excluido' => $horta->excluido,
            'data_de_criacao' => $horta->data_de_criacao,
            'data_de_ultima_alteracao' => $horta->data_de_ultima_alteracao,
        ];

        $response->getBody()->write(json_encode($hortaFormatada));
        return $response->withStatus(200);
    }

    public function delete(Request $request, Response $response, array $args){   
        
        $payloadUsuarioLogado = [
            'usuario_uuid' => $request->getAttribute('usuario_uuid'),
            'cargo_uuid' => $request->getAttribute('cargo_uuid'),
            'associacao_uuid' => $request->getAttribute('associacao_uuid'),
            'horta_uuid' => $request->getAttribute('horta_uuid'),
        ];
        $uuidUsuarioLogado = $request->getAttribute('usuario_uuid');
        $this->hortaService->delete($args['uuid'], $payloadUsuarioLogado);
        
        $response->getBody()->write(json_encode([
            "message" => "Registro UUID: " . $args['uuid'] . " excluído"
        ]));
        return $response->withStatus(200);
    }
}
