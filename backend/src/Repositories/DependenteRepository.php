<?php

namespace App\Repositories;

use App\Models\DependenteModel;
use Ramsey\Uuid\Uuid;

class DependenteRepository
{
    public function findAll()
    {
        return DependenteModel::where('excluido', false)->get();
    }

    public function findByUuid(string $uuid)
    {
        return DependenteModel::where('uuid', $uuid)
            ->where('excluido', false)
            ->first();
    }

    public function create(array $data)
    {
        $data['uuid'] = Uuid::uuid4()->toString();
        $data['excluido'] = false;
        
        return DependenteModel::create($data);
    }

    public function update(string $uuid, array $data)
    {
        $dependente = $this->findByUuid($uuid);
        
        if (!$dependente) {
            return null;
        }

        $dependente->update($data);
        return $dependente->fresh();
    }

    public function delete(string $uuid)
    {
        $dependente = $this->findByUuid($uuid);
        
        if (!$dependente) {
            return false;
        }

        // Soft delete
        $dependente->excluido = true;
        $dependente->save();
        
        return true;
    }
}
