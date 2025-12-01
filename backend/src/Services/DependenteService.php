<?php

namespace App\Services;

use App\Repositories\DependenteRepository;

class DependenteService
{
    protected DependenteRepository $dependenteRepository;

    public function __construct(DependenteRepository $dependenteRepository)
    {
        $this->dependenteRepository = $dependenteRepository;
    }

    public function findAllWhere(array $payloadUsuarioLogado)
    {
        // TODO: Implementar verificação de permissões quando necessário
        // Por enquanto, retorna todos os dependentes
        return $this->dependenteRepository->findAll();
    }

    public function findByUuid(string $uuid, array $payloadUsuarioLogado)
    {
        // TODO: Implementar verificação de permissões quando necessário
        return $this->dependenteRepository->findByUuid($uuid);
    }

    public function create(array $data, array $payloadUsuarioLogado)
    {
        // TODO: Implementar verificação de permissões quando necessário
        
        // Adiciona o UUID do usuário criador
        $data['usuario_criador_uuid'] = $payloadUsuarioLogado['usuario_uuid'];
        
        // Se não informou ativo, assume true
        if (!isset($data['ativo'])) {
            $data['ativo'] = true;
        }
        
        return $this->dependenteRepository->create($data);
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
        
        return $this->dependenteRepository->update($uuid, $data);
    }

    public function delete(string $uuid, array $payloadUsuarioLogado)
    {
        // TODO: Implementar verificação de permissões quando necessário
        return $this->dependenteRepository->delete($uuid);
    }
}
