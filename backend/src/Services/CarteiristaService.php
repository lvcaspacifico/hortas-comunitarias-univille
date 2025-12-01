<?php

namespace App\Services;

use App\Repositories\CarteiristaRepository;

class CarteiristaService
{
    protected CarteiristaRepository $carteiristaRepository;

    public function __construct(CarteiristaRepository $carteiristaRepository)
    {
        $this->carteiristaRepository = $carteiristaRepository;
    }

    public function findAllWhere(array $payloadUsuarioLogado)
    {
        // TODO: Implementar verificação de permissões quando necessário
        // Por enquanto, retorna todos os carteiristas
        return $this->carteiristaRepository->findAll();
    }

    public function findByUuid(string $uuid, array $payloadUsuarioLogado)
    {
        // TODO: Implementar verificação de permissões quando necessário
        return $this->carteiristaRepository->findByUuid($uuid);
    }

    public function create(array $data, array $payloadUsuarioLogado)
    {
        // TODO: Implementar verificação de permissões quando necessário
        
        // Adiciona o UUID do usuário criador
        $data['usuario_criador_uuid'] = $payloadUsuarioLogado['usuario_uuid'];
        
        return $this->carteiristaRepository->create($data);
    }

    public function update(string $uuid, array $data, array $payloadUsuarioLogado)
    {
        // TODO: Implementar verificação de permissões quando necessário
        
        // Adiciona o UUID do usuário alterador
        $data['usuario_alterador_uuid'] = $payloadUsuarioLogado['usuario_uuid'];
        
        // Remove campos que não devem ser atualizados
        unset($data['uuid']);
        unset($data['usuario_criador_uuid']);
        unset($data['data_de_criacao']);
        
        return $this->carteiristaRepository->update($uuid, $data);
    }

    public function delete(string $uuid, array $payloadUsuarioLogado)
    {
        // TODO: Implementar verificação de permissões quando necessário
        return $this->carteiristaRepository->delete($uuid);
    }
}
