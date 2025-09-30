<?php
namespace App\Controllers;

use App\Services\SessaoService;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class SessaoController
{   
    private SessaoService $sessaoService;

    public function __construct(SessaoService $sessaoService){
        $this->sessaoService = $sessaoService;
    }

    public function signIn(Request $request, Response $response)
    {
        $data = (array)$request->getParsedBody();

        try {
            $token = $this->sessaoService->signIn($data['email'] ?? '', $data['senha'] ?? '');
            $response->getBody()->write(json_encode(['token' => $token]));
        } catch (\Exception $e) {
            $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
            return $response->withStatus(401);
        }

        return $response;
    }
    public function signUp(Request $request, Response $response)
    {
        $data = (array)$request->getParsedBody(); 
        $cadastroCriado = $this->sessaoService->signUp($data);
        $response->getBody()->write(json_encode($cadastroCriado));
        
        return $response->withStatus(200);
    }
}
